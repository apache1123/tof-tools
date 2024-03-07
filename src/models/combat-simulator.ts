import { commonWeaponPassiveAttackBuffs } from '../constants/common-weapon-attack-buffs';
import type { Loadout } from './loadout';
import type { Relics } from './relics';
import type { Attack } from './v4/attack';
import { AttackBuffEvent } from './v4/attack-buff-event';
import { AttackEvent } from './v4/attack-event';
import { DamageBuffEvent } from './v4/damage-buff-event';
import { Timeline } from './v4/timeline';
import type { Weapon } from './weapon';

export class CombatSimulator {
  public readonly attackTimelinesByWeapon = new Map<
    Weapon,
    Timeline<AttackEvent>
  >();
  public readonly weaponPassiveAttackBuffTimelinesByBuff = new Map<
    string,
    Timeline<AttackBuffEvent>
  >();
  public readonly weaponDamageBuffTimelinesByBuff = new Map<
    string,
    Timeline<DamageBuffEvent>
  >();
  public readonly relicPassiveDamageBuffTimelinesByBuff = new Map<
    string,
    Timeline<DamageBuffEvent>
  >();

  public constructor(
    public readonly combatDuration: number,
    private readonly loadout: Loadout,
    private readonly relics: Relics
  ) {
    loadout.team.weapons.forEach((weapon) => {
      this.attackTimelinesByWeapon.set(weapon, new Timeline<AttackEvent>());
    });
  }

  public get activeWeapon(): Weapon | undefined {
    // Find the weapon with the latest attack
    let result:
      | { weapon: Weapon; attackTimeline: Timeline<AttackEvent> }
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
        (x) => x.attack.attackDefinition.id !== attack.attackDefinition.id
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

    attackTimeline.addEvent(
      new AttackEvent(attack, nextEarliestAttackStartTime)
    );

    // Add attack buffs triggered at the start of combat
    if (nextEarliestAttackStartTime === 0) {
      this.triggerWeaponPassiveAttackBuffs();
      this.triggerRelicPassiveBuffs();
    }
  }

  private triggerWeaponPassiveAttackBuffs() {
    this.loadout.team.weapons.forEach((weapon) => {
      weapon.definition.commonPassiveAttackBuffs.forEach((buffId) => {
        // Assuming all common weapon passive attack buffs can only have 1 stack each
        if (!this.weaponPassiveAttackBuffTimelinesByBuff.has(buffId)) {
          const buffDefinition = commonWeaponPassiveAttackBuffs[buffId];
          const timeline = new Timeline<AttackBuffEvent>();
          timeline.addEvent(
            new AttackBuffEvent(0, this.combatDuration, buffDefinition)
          );
          this.weaponPassiveAttackBuffTimelinesByBuff.set(buffId, timeline);
        }
      });
    });
  }

  private triggerRelicPassiveBuffs() {
    this.relics.passiveRelicBuffs.forEach((buffDefinition) => {
      const { id } = buffDefinition;
      const timeline = new Timeline<DamageBuffEvent>();
      timeline.addEvent(
        new DamageBuffEvent(0, this.combatDuration, buffDefinition)
      );
      this.relicPassiveDamageBuffTimelinesByBuff.set(id, timeline);
    });
  }
}
