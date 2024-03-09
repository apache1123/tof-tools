import { commonWeaponPassiveAttackBuffs } from '../../constants/common-weapon-attack-buffs';
import { commonWeaponDamageBuffs } from '../../constants/common-weapon-damage-buffs';
import type { Loadout } from '../loadout';
import type { Weapon } from '../weapon';
import type { Attack } from './attack';
import type { AttackBuffDefinition } from './attack-buff-definition';
import { AttackEventData } from './attack-event-data';
import type { DamageBuffDefinition } from './damage-buff-definition';
import type { Relics } from './relics';
import { ChronologicalTimeline } from './timeline/chronological-timeline';
import { StackableChronologicalTimeline } from './timeline/stackable-timeline';
import { StackableTimelineEvent } from './timeline/stackable-timeline-event';
import { TimelineEvent } from './timeline/timeline-event';

export class CombatSimulator {
  public readonly attackTimelinesByWeapon = new Map<
    Weapon,
    ChronologicalTimeline<AttackEventData>
  >();
  public readonly weaponPassiveAttackBuffTimelinesByBuff = new Map<
    string,
    StackableChronologicalTimeline<AttackBuffDefinition>
  >();
  public readonly weaponDamageBuffTimelinesByBuff = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();
  public readonly relicPassiveDamageBuffTimelinesByBuff = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();

  public constructor(
    public readonly combatDuration: number,
    private readonly loadout: Loadout,
    private readonly relics: Relics
  ) {
    loadout.team.weapons.forEach((weapon) => {
      this.attackTimelinesByWeapon.set(
        weapon,
        new ChronologicalTimeline<AttackEventData>()
      );
    });
  }

  public get activeWeapon(): Weapon | undefined {
    // Find the weapon with the latest attack
    let result:
      | {
          weapon: Weapon;
          attackTimeline: ChronologicalTimeline<AttackEventData>;
        }
      | undefined;

    for (const [weapon, attackTimeline] of this.attackTimelinesByWeapon) {
      if (
        attackTimeline.lastEvent &&
        (!result ||
          (result.attackTimeline.lastEvent &&
            attackTimeline.lastEvent.endTime >
              result.attackTimeline.lastEvent.endTime))
      ) {
        result = { weapon, attackTimeline };
      }
    }

    return result?.weapon;
  }

  public get availableAttacks(): Attack[] {
    const allAttacks = this.loadout.team.weapons.flatMap((weapon): Attack[] => {
      const normalAttacks = weapon.definition.normalAttacks.map(
        (attackDefinition) => ({
          weapon,
          attackDefinition,
        })
      );

      const skills = weapon.definition.skills.map((attackDefinition) => ({
        weapon,
        attackDefinition,
      }));

      return [...normalAttacks, ...skills];
    });

    return allAttacks.filter((attack) => {
      // Check to see if this attack has been performed in the timeline in the cooldown range
      const {
        attackDefinition: { cooldown },
      } = attack;
      const { nextEarliestAttackStartTime } = this;

      const attackEventsToCheck =
        this.attackTimelinesByWeapon
          .get(attack.weapon)
          ?.getEventsBetween(
            nextEarliestAttackStartTime - cooldown,
            nextEarliestAttackStartTime
          ) ?? [];
      return attackEventsToCheck.every(
        (x) => x.data.attack.attackDefinition.id !== attack.attackDefinition.id
      );
    });
  }

  public get nextEarliestAttackStartTime(): number {
    return this.activeWeapon
      ? this.attackTimelinesByWeapon.get(this.activeWeapon)
          ?.nextEarliestStartTime ?? 0
      : 0;
  }

  public performAttack(attack: Attack) {
    const { weapon, attackDefinition } = attack;
    if (
      !this.availableAttacks.find(
        (availableAttack) =>
          availableAttack.weapon === weapon &&
          availableAttack.attackDefinition.id === attackDefinition.id
      )
    ) {
      throw new Error('Attack not available to be performed');
    }

    const { nextEarliestAttackStartTime } = this;
    const attackTimeline = this.attackTimelinesByWeapon.get(attack.weapon);

    if (!attackTimeline) {
      throw new Error('Weapon attack timeline not set up');
    }

    const attackEvent = new TimelineEvent(
      nextEarliestAttackStartTime,
      attack.attackDefinition.duration,
      new AttackEventData(attack)
    );
    attackTimeline.addEvent(attackEvent);

    this.triggerCommonWeaponDamageBuffs(attackEvent);

    // Add attack buffs triggered at the start of combat
    if (nextEarliestAttackStartTime === 0) {
      this.triggerWeaponPassiveAttackBuffs();
      this.triggerRelicPassiveBuffs();
    }
  }

  private triggerCommonWeaponDamageBuffs(
    attackEvent: TimelineEvent<AttackEventData>
  ) {
    const {
      data: {
        attack: {
          weapon: { definition: weaponDefinition },
          attackDefinition,
        },
      },
    } = attackEvent;

    weaponDefinition.commonDamageBuffs.forEach(
      ({ buffId, triggeredByAttackIds }) => {
        if (triggeredByAttackIds?.includes(attackDefinition.id)) {
          const buffDefinition = commonWeaponDamageBuffs[buffId];

          if (!buffDefinition.duration) return;

          if (!this.weaponDamageBuffTimelinesByBuff.has(buffId)) {
            const timeline =
              new StackableChronologicalTimeline<DamageBuffDefinition>();
            timeline.addEvent(
              new StackableTimelineEvent(
                attackEvent.startTime,
                buffDefinition.duration,
                buffDefinition,
                buffDefinition.maxStacks
              )
            );
            this.weaponDamageBuffTimelinesByBuff.set(buffId, timeline);
          }
        }
      }
    );
  }

  private triggerWeaponPassiveAttackBuffs() {
    this.loadout.team.weapons.forEach((weapon) => {
      weapon.definition.commonPassiveAttackBuffs.forEach((buffId) => {
        const buffDefinition = commonWeaponPassiveAttackBuffs[buffId];

        if (!this.hasAttackBuffMetRequirements(buffDefinition)) return;

        // Assuming all common weapon passive attack buffs can only have 1 stack each
        if (!this.weaponPassiveAttackBuffTimelinesByBuff.has(buffId)) {
          const timeline =
            new StackableChronologicalTimeline<AttackBuffDefinition>();
          timeline.addEvent(
            new StackableTimelineEvent(0, this.combatDuration, buffDefinition)
          );
          this.weaponPassiveAttackBuffTimelinesByBuff.set(buffId, timeline);
        }
      });
    });
  }

  private triggerRelicPassiveBuffs() {
    this.relics.passiveRelicBuffs.forEach((buffDefinition) => {
      const { id } = buffDefinition;
      const timeline =
        new StackableChronologicalTimeline<DamageBuffDefinition>();
      timeline.addEvent(
        new StackableTimelineEvent(0, this.combatDuration, buffDefinition)
      );
      this.relicPassiveDamageBuffTimelinesByBuff.set(id, timeline);
    });
  }

  private hasAttackBuffMetRequirements(
    attackBuff: AttackBuffDefinition
  ): boolean {
    const { elementalWeaponRequirements, weaponResonanceRequirements } =
      attackBuff;
    const { weapons, weaponResonance } = this.loadout.team;

    if (elementalWeaponRequirements) {
      const weaponElementalTypes = weapons.flatMap(
        (weapon) => weapon.definition.elementalTypes
      );

      let hasMetElementalWeaponsRequirement = false;
      elementalWeaponRequirements.forEach(
        ({ weaponElementalType, minNumOfWeapons }) => {
          if (
            weaponElementalTypes.filter((x) => x === weaponElementalType)
              .length >= minNumOfWeapons
          )
            hasMetElementalWeaponsRequirement = true;
        }
      );

      if (!hasMetElementalWeaponsRequirement) return false;
    }

    if (
      weaponResonanceRequirements &&
      (!weaponResonance ||
        !weaponResonanceRequirements.includes(weaponResonance))
    )
      return false;

    return true;
  }
}
