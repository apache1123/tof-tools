import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { commonWeaponPassiveAttackBuffs } from '../../constants/common-weapon-attack-buffs';
import { commonWeaponDamageBuffs } from '../../constants/common-weapon-damage-buffs';
import type { Loadout } from '../loadout';
import type { Weapon } from '../weapon';
import type { Attack } from './attack';
import type { AttackBuffDefinition } from './attack-buff-definition';
import { AttackEventData } from './attack-event-data';
import type { DamageBuffDefinition } from './damage-buff-definition';
import type { MiscellaneousBuffDefinition } from './miscellaneous-buff-definition';
import type { Relics } from './relics';
import { ChronologicalTimeline } from './timeline/chronological-timeline';
import { StackableChronologicalTimeline } from './timeline/stackable-timeline';
import { StackableTimelineEvent } from './timeline/stackable-timeline-event';
import { TimelineEvent } from './timeline/timeline-event';

export class CombatSimulator {
  public readonly attackTimelines = new Map<
    Weapon,
    ChronologicalTimeline<AttackEventData>
  >();
  public readonly weaponPassiveAttackBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<AttackBuffDefinition>
  >();
  public readonly weaponDamageBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();
  public readonly relicPassiveDamageBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();
  public readonly simulacrumTraitDamageBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();
  public readonly simulacrumTraitAttackBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<AttackBuffDefinition>
  >();
  public readonly simulacrumTraitMiscBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<MiscellaneousBuffDefinition>
  >();

  public constructor(
    public readonly combatDuration: number,
    private readonly loadout: Loadout,
    private readonly relics: Relics
  ) {
    loadout.team.weapons.forEach((weapon) => {
      this.attackTimelines.set(
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

    for (const [weapon, attackTimeline] of this.attackTimelines) {
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

      const dodgeAttacks = weapon.definition.dodgeAttacks.map(
        (attackDefinition) => ({
          weapon,
          attackDefinition,
        })
      );

      const skills = weapon.definition.skills.map((attackDefinition) => ({
        weapon,
        attackDefinition,
      }));

      // TODO: discharge depends on charge
      const discharge = {
        weapon: weapon,
        attackDefinition: weapon.definition.discharge,
      };

      return [...normalAttacks, ...dodgeAttacks, ...skills, discharge];
    });

    return allAttacks.filter((attack) => {
      // Check to see if this attack has been performed in the timeline in the cooldown range
      const {
        attackDefinition: { cooldown },
      } = attack;
      const { nextEarliestAttackStartTime } = this;

      const attackEventsToCheck =
        this.attackTimelines
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
      ? this.attackTimelines.get(this.activeWeapon)?.nextEarliestStartTime ?? 0
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
    const attackTimeline = this.attackTimelines.get(attack.weapon);

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
    this.triggerTraitDamageBuffs(attackEvent);
    this.triggerTraitAttackBuffs(attackEvent);
    this.triggerTraitMiscBuffs(attackEvent);

    // Add buffs triggered at the start of combat
    if (nextEarliestAttackStartTime === 0) {
      this.triggerWeaponPassiveAttackBuffs();
      this.triggerRelicPassiveBuffs();
      this.triggerTraitPassiveDamageBuffs();
      this.triggerTraitPassiveAttackBuffs();
      this.triggerTraitPassiveMiscBuffs();
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

          if (!this.weaponDamageBuffTimelines.has(buffId)) {
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
            this.weaponDamageBuffTimelines.set(buffId, timeline);
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
        if (!this.weaponPassiveAttackBuffTimelines.has(buffId)) {
          const timeline =
            new StackableChronologicalTimeline<AttackBuffDefinition>();
          timeline.addEvent(
            new StackableTimelineEvent(0, this.combatDuration, buffDefinition)
          );
          this.weaponPassiveAttackBuffTimelines.set(buffId, timeline);
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
      this.relicPassiveDamageBuffTimelines.set(id, timeline);
    });
  }

  private triggerTraitPassiveDamageBuffs() {
    this.loadout.simulacrumTrait?.passiveDamageBuffs.forEach(
      (buffDefinition) => {
        const {
          id,
          maxStacks,
          applyToEndSegmentOfCombat,
          weaponRequirement,
          differentWeaponElementalTypeRequirement,
          elementalWeaponRequirement,
          weaponResonanceRequirement,
        } = buffDefinition;

        // Check requirements first. If any requirement fails, exit out immediately
        if (
          weaponRequirement &&
          !this.loadout.team.weaponNames.includes(weaponRequirement)
        )
          return;
        if (differentWeaponElementalTypeRequirement) {
          const numOfDifferentElementalTypes = Object.keys(
            groupBy(this.loadout.team.weaponElementalTypes)
          ).length;
          if (
            numOfDifferentElementalTypes !==
            differentWeaponElementalTypeRequirement.numOfDifferentElementalTypes
          ) {
            return;
          }
        }
        // TODO: this is duplicated below
        if (elementalWeaponRequirement) {
          const numOfWeaponsOfElementalType =
            this.loadout.team.weaponElementalTypes.filter(
              (x) => x === elementalWeaponRequirement.weaponElementalType
            ).length;

          if (
            numOfWeaponsOfElementalType !==
            elementalWeaponRequirement.numOfWeapons
          ) {
            return;
          }
        }
        if (
          weaponResonanceRequirement &&
          this.loadout.team.weaponResonance !== weaponResonanceRequirement
        ) {
          return;
        }

        let startTime = 0;
        let buffDuration = this.combatDuration;
        if (applyToEndSegmentOfCombat) {
          buffDuration = BigNumber(this.combatDuration)
            .times(applyToEndSegmentOfCombat)
            .toNumber();
          startTime = BigNumber(this.combatDuration)
            .minus(buffDuration)
            .toNumber();
        }

        const timeline =
          new StackableChronologicalTimeline<DamageBuffDefinition>();
        timeline.addEvent(
          new StackableTimelineEvent(
            startTime,
            buffDuration,
            buffDefinition,
            maxStacks
          )
        );
        this.simulacrumTraitDamageBuffTimelines.set(id, timeline);
      }
    );
  }

  private triggerTraitPassiveAttackBuffs() {
    this.loadout.simulacrumTrait?.passiveAttackBuffs.forEach(
      (buffDefinition) => {
        const { id, maxStacks } = buffDefinition;

        // Check requirements first. If any requirement fails, exit out immediately

        const timeline =
          new StackableChronologicalTimeline<AttackBuffDefinition>();
        timeline.addEvent(
          new StackableTimelineEvent(
            0,
            this.combatDuration,
            buffDefinition,
            maxStacks
          )
        );
        this.simulacrumTraitAttackBuffTimelines.set(id, timeline);
      }
    );
  }

  private triggerTraitPassiveMiscBuffs() {
    this.loadout.simulacrumTrait?.passiveMiscellaneousBuffs.forEach(
      (buffDefinition) => {
        const { id } = buffDefinition;

        const timeline =
          new StackableChronologicalTimeline<MiscellaneousBuffDefinition>();
        timeline.addEvent(
          new StackableTimelineEvent(0, this.combatDuration, buffDefinition)
        );
        this.simulacrumTraitMiscBuffTimelines.set(id, timeline);
      }
    );
  }

  private triggerTraitDamageBuffs(attackEvent: TimelineEvent<AttackEventData>) {
    this.loadout.simulacrumTrait?.conditionalDamageBuffs.forEach(
      (buffDefinition) => {
        const {
          id,
          duration,
          triggeredByAnyWeaponSkill,
          triggeredByCombatStart,
          triggeredByWeaponAttack,
          triggeredByActiveWeapon,
          triggeredByElementalTypeSkill,
          triggeredByElementalTypeDischarge,
          elementalWeaponRequirement,
          notElementalTypeWeaponRequirement,
        } = buffDefinition;

        // Check requirements first. If any requirement fails, exit out immediately
        if (elementalWeaponRequirement) {
          const numOfWeaponsOfElementalType =
            this.loadout.team.weaponElementalTypes.filter(
              (x) => x === elementalWeaponRequirement.weaponElementalType
            ).length;

          if (
            numOfWeaponsOfElementalType !==
            elementalWeaponRequirement.numOfWeapons
          )
            return;
        }
        if (notElementalTypeWeaponRequirement) {
          const numOfNotElementalTypeWeapons = this.loadout.team.weapons.filter(
            (weapon) =>
              !weapon.definition.elementalTypes.includes(
                notElementalTypeWeaponRequirement.notElementalType
              )
          ).length;

          if (
            numOfNotElementalTypeWeapons !==
            notElementalTypeWeaponRequirement.numOfWeapons
          )
            return;
        }

        // Check triggers (from most specific to least).
        let shouldAddBuff = false;
        let buffDuration = duration;
        if (
          triggeredByWeaponAttack &&
          attackEvent.data.attack.attackDefinition.id ===
            triggeredByWeaponAttack
        ) {
          shouldAddBuff = true;
        } else if (
          triggeredByActiveWeapon &&
          attackEvent.data.attack.weapon.definition.id ===
            triggeredByActiveWeapon
        ) {
          shouldAddBuff = true;
          buffDuration = buffDuration ?? attackEvent.duration;
        } else if (
          triggeredByElementalTypeSkill &&
          attackEvent.data.attack.attackDefinition.type === 'skill' &&
          attackEvent.data.attack.weapon.definition.elementalTypes.includes(
            triggeredByElementalTypeSkill
          )
        ) {
          shouldAddBuff = true;
        } else if (
          triggeredByElementalTypeDischarge &&
          attackEvent.data.attack.attackDefinition.type === 'discharge' &&
          attackEvent.data.attack.weapon.definition.elementalTypes.includes(
            triggeredByElementalTypeDischarge
          )
        ) {
          shouldAddBuff = true;
        } else if (
          triggeredByAnyWeaponSkill &&
          attackEvent.data.attack.attackDefinition.type === 'skill'
        ) {
          shouldAddBuff = true;
        } else if (triggeredByCombatStart && attackEvent.startTime === 0) {
          shouldAddBuff = true;
        }

        if (shouldAddBuff && buffDuration) {
          if (!this.simulacrumTraitDamageBuffTimelines.has(id)) {
            this.simulacrumTraitDamageBuffTimelines.set(
              id,
              new StackableChronologicalTimeline()
            );
          }

          this.simulacrumTraitDamageBuffTimelines
            .get(id)
            ?.addEvent(
              new StackableTimelineEvent(
                attackEvent.startTime,
                buffDuration,
                buffDefinition,
                buffDefinition.maxStacks
              )
            );
        }
      }
    );
  }

  public triggerTraitAttackBuffs(attackEvent: TimelineEvent<AttackEventData>) {
    this.loadout.simulacrumTrait?.conditionalAttackBuffs.forEach(
      (buffDefinition) => {
        const {
          id,
          duration,
          maxStacks,
          triggeredBySkillOfWeaponType,
          triggeredByDischargeOfWeaponType,
          triggeredByWeaponAttack,
          triggeredByAnyWeaponSkill,
          triggeredByAnyWeaponDischarge,
        } = buffDefinition;

        let shouldAddBuff = false;
        if (
          triggeredByWeaponAttack &&
          triggeredByWeaponAttack ===
            attackEvent.data.attack.attackDefinition.id
        ) {
          shouldAddBuff = true;
        } else if (
          triggeredBySkillOfWeaponType &&
          attackEvent.data.attack.attackDefinition.type === 'skill' &&
          triggeredBySkillOfWeaponType.weaponType ===
            attackEvent.data.attack.weapon.definition.type
        ) {
          shouldAddBuff = true;
        } else if (
          triggeredByDischargeOfWeaponType &&
          attackEvent.data.attack.attackDefinition.type === 'discharge' &&
          triggeredByDischargeOfWeaponType.weaponType ===
            attackEvent.data.attack.weapon.definition.type
        ) {
          shouldAddBuff = true;
        } else if (
          triggeredByAnyWeaponSkill &&
          attackEvent.data.attack.attackDefinition.type === 'skill'
        ) {
          shouldAddBuff = true;
        } else if (
          triggeredByAnyWeaponDischarge &&
          attackEvent.data.attack.attackDefinition.type === 'discharge'
        ) {
          shouldAddBuff = true;
        }

        if (shouldAddBuff && duration) {
          if (!this.simulacrumTraitAttackBuffTimelines.has(id)) {
            this.simulacrumTraitAttackBuffTimelines.set(
              id,
              new StackableChronologicalTimeline()
            );
          }

          this.simulacrumTraitAttackBuffTimelines
            .get(id)
            ?.addEvent(
              new StackableTimelineEvent(
                attackEvent.startTime,
                duration,
                buffDefinition,
                maxStacks
              )
            );
        }
      }
    );
  }

  private triggerTraitMiscBuffs(attackEvent: TimelineEvent<AttackEventData>) {
    this.loadout.simulacrumTrait?.conditionalMiscellaneousBuffs.forEach(
      (buffDefinition) => {
        const { id, triggeredByActiveWeapon, elementalWeaponRequirement } =
          buffDefinition;

        if (
          elementalWeaponRequirement &&
          this.loadout.team.weaponElementalTypes.filter(
            (elementalType) =>
              elementalType === elementalWeaponRequirement.weaponElementalType
          ).length !== elementalWeaponRequirement.numOfWeapons
        ) {
          return;
        }

        if (
          triggeredByActiveWeapon &&
          triggeredByActiveWeapon ===
            attackEvent.data.attack.weapon.definition.id
        ) {
          if (!this.simulacrumTraitMiscBuffTimelines.has(id)) {
            this.simulacrumTraitMiscBuffTimelines.set(
              id,
              new StackableChronologicalTimeline()
            );
          }

          this.simulacrumTraitMiscBuffTimelines
            .get(id)
            ?.addEvent(
              new StackableTimelineEvent(
                attackEvent.startTime,
                attackEvent.duration,
                buffDefinition
              )
            );
        }
      }
    );
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
