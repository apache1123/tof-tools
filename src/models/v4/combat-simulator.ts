import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { commonWeaponAttackBuffs } from '../../constants/common-weapon-attack-buffs';
import { commonWeaponDamageBuffs } from '../../constants/common-weapon-damage-buffs';
import type { Loadout } from '../loadout';
import type { Weapon } from '../weapon';
import type { Attack } from './attack';
import { AttackEventData } from './attack-event-data';
import type { AttackBuffDefinition } from './buffs/attack-buff-definition';
import type { BuffDefinition } from './buffs/buff-definition';
import type { DamageBuffDefinition } from './buffs/damage-buff-definition';
import type { MiscellaneousBuffDefinition } from './buffs/miscellaneous-buff-definition';
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
  public readonly weaponAttackBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<AttackBuffDefinition>
  >();
  public readonly weaponDamageBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();
  public readonly relicDamageBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();
  public readonly traitAttackBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<AttackBuffDefinition>
  >();
  public readonly traitDamageBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<DamageBuffDefinition>
  >();
  public readonly traitMiscBuffTimelines = new Map<
    string,
    StackableChronologicalTimeline<MiscellaneousBuffDefinition>
  >();

  /** Registered buff definitions will be checked whenever an attack happens. A buff event will be added to the timeline if the conditions defined in the buff definition are met */
  private registeredBuffs: {
    buffDefinitions: BuffDefinition[];
    timelineGroupToAddTo: Map<
      string,
      StackableChronologicalTimeline<BuffDefinition>
    >;
  }[] = [];

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

    this.registerBuffs();
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

    // Register all buffs first at the start of combat
    if (attackEvent.startTime === 0) {
      this.registerBuffs();
    }

    this.triggerRegisteredBuffsIfApplicable(attackEvent);
  }

  private triggerRegisteredBuffsIfApplicable(
    attackEvent: TimelineEvent<AttackEventData>
  ) {
    this.registeredBuffs.forEach(
      ({ buffDefinitions, timelineGroupToAddTo }) => {
        buffDefinitions.forEach((buffDefinition) => {
          this.addBuffIfApplicable(
            buffDefinition,
            timelineGroupToAddTo,
            attackEvent
          );
        });
      }
    );
  }

  private registerBuffs() {
    this.registeredBuffs = [
      {
        buffDefinitions: this.loadout.team.weapons.flatMap((weapon) =>
          weapon.definition.commonAttackBuffs.map(
            (buffId) => commonWeaponAttackBuffs[buffId]
          )
        ),
        timelineGroupToAddTo: this.weaponAttackBuffTimelines,
      },
      {
        buffDefinitions: this.loadout.team.weapons.flatMap((weapon) =>
          weapon.definition.commonDamageBuffs.map(
            (buffId) => commonWeaponDamageBuffs[buffId]
          )
        ),
        timelineGroupToAddTo: this.weaponDamageBuffTimelines,
      },
      {
        buffDefinitions: this.relics.passiveRelicBuffs,
        timelineGroupToAddTo: this.relicDamageBuffTimelines,
      },
      {
        buffDefinitions: this.loadout.simulacrumTrait?.attackBuffs ?? [],
        timelineGroupToAddTo: this.traitAttackBuffTimelines,
      },
      {
        buffDefinitions: this.loadout.simulacrumTrait?.damageBuffs ?? [],
        timelineGroupToAddTo: this.traitDamageBuffTimelines,
      },
      {
        buffDefinitions: this.loadout.simulacrumTrait?.miscellaneousBuffs ?? [],
        timelineGroupToAddTo: this.traitMiscBuffTimelines,
      },
    ];
  }

  private addBuffIfApplicable(
    buffDefinition: BuffDefinition,
    timelineGroup: Map<string, StackableChronologicalTimeline<BuffDefinition>>,
    attackEvent: TimelineEvent<AttackEventData>
  ) {
    if (!this.hasBuffMetRequirements(buffDefinition)) return;
    if (!this.shouldTriggerBuff(buffDefinition, attackEvent)) return;

    const buffTimePeriod = this.determineBuffTimePeriod(
      buffDefinition,
      attackEvent
    );
    if (!buffTimePeriod) return;

    const { id, maxStacks } = buffDefinition;

    if (!timelineGroup.has(id)) {
      timelineGroup.set(id, new StackableChronologicalTimeline());
    }

    timelineGroup
      .get(id)
      ?.addEvent(
        new StackableTimelineEvent(
          buffTimePeriod.startTime,
          buffTimePeriod.duration,
          buffDefinition,
          maxStacks
        )
      );
  }

  private hasBuffMetRequirements(buff: BuffDefinition): boolean {
    const { requirements } = buff;
    if (!requirements) return true;

    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.loadout.team;

    // Check requirements from most specific to least specific for efficiency

    if (
      requirements.weaponInTeam &&
      !weaponNames.includes(requirements.weaponInTeam)
    )
      return false;

    if (
      requirements.weaponResonance &&
      weaponResonance !== requirements.weaponResonance
    )
      return false;

    const elementalTypeWeaponRequirement =
      requirements.elementalTypeWeaponsInTeam;
    if (elementalTypeWeaponRequirement) {
      const numOfWeaponsOfElementalType = weaponElementalTypes.filter(
        (x) => x === elementalTypeWeaponRequirement.elementalType
      ).length;

      if (
        numOfWeaponsOfElementalType !==
        elementalTypeWeaponRequirement.numOfWeapons
      )
        return false;
    }

    const notElementalTypeWeaponRequirement =
      requirements.notElementalTypeWeaponsInTeam;
    if (notElementalTypeWeaponRequirement) {
      const numOfNotElementalTypeWeapons = weapons.filter(
        (weapon) =>
          !weapon.definition.elementalTypes.includes(
            notElementalTypeWeaponRequirement.notElementalType
          )
      ).length;

      if (
        numOfNotElementalTypeWeapons !==
        notElementalTypeWeaponRequirement.numOfWeapons
      )
        return false;
    }

    if (requirements.numOfDifferentElementalTypesInTeam) {
      const numOfDifferentElementalTypes = Object.keys(
        groupBy(weaponElementalTypes)
      ).length;

      if (
        numOfDifferentElementalTypes !==
        requirements.numOfDifferentElementalTypesInTeam
      )
        return false;
    }

    return true;
  }

  private shouldTriggerBuff(
    buffDefinition: BuffDefinition,
    attackEvent: TimelineEvent<AttackEventData>
  ): boolean {
    // TODO: cooldown
    const { triggeredBy } = buffDefinition;

    const {
      data: {
        attack: {
          attackDefinition: { id: attackId, type: attackType },
          weapon: {
            definition: {
              id: weaponId,
              type: weaponType,
              elementalTypes: weaponElementalTypes,
            },
          },
        },
      },
    } = attackEvent;

    // Check triggers from least specific to most specific for efficiency

    if (triggeredBy.combatStart && attackEvent.startTime === 0) return true;

    if (triggeredBy.skillOfAnyWeapon && attackType === 'skill') return true;

    if (triggeredBy.dischargeOfAnyWeapon && attackType === 'discharge')
      return true;

    if (
      triggeredBy.skillOfWeaponType &&
      attackType === 'skill' &&
      weaponType === triggeredBy.skillOfWeaponType
    )
      return true;

    if (
      triggeredBy.dischargeOfWeaponType &&
      attackType === 'discharge' &&
      weaponType === triggeredBy.dischargeOfWeaponType
    )
      return true;

    // TODO: need to check if dual element weapons trigger this
    if (
      triggeredBy.skillOfElementalType &&
      attackType === 'skill' &&
      weaponElementalTypes.includes(triggeredBy.skillOfElementalType)
    )
      return true;

    // TODO: need to check if dual element weapons trigger this
    if (
      triggeredBy.dischargeOfElementalType &&
      attackType === 'discharge' &&
      weaponElementalTypes.includes(triggeredBy.dischargeOfElementalType)
    )
      return true;

    if (triggeredBy.activeWeapon && weaponId === triggeredBy.activeWeapon)
      return true;

    if (
      triggeredBy.weaponAttacks &&
      triggeredBy.weaponAttacks.includes(attackId)
    )
      return true;

    return false;
  }

  private determineBuffTimePeriod(
    buff: BuffDefinition,
    attackEvent: TimelineEvent<AttackEventData>
  ): { startTime: number; duration: number } | undefined {
    const {
      duration: {
        value,
        followActiveWeapon,
        applyToEndSegmentOfCombat,
        untilCombatEnd,
      },
    } = buff;

    if (value) {
      return { startTime: attackEvent.startTime, duration: value };
    }
    if (followActiveWeapon) {
      return {
        startTime: attackEvent.startTime,
        duration: attackEvent.duration,
      };
    }
    if (applyToEndSegmentOfCombat) {
      const duration = BigNumber(this.combatDuration)
        .times(applyToEndSegmentOfCombat)
        .toNumber();
      const startTime = BigNumber(this.combatDuration)
        .minus(duration)
        .toNumber();

      return { startTime, duration };
    }
    if (untilCombatEnd) {
      return {
        startTime: attackEvent.startTime,
        duration: BigNumber(this.combatDuration)
          .minus(attackEvent.startTime)
          .toNumber(),
      };
    }

    return undefined;
  }
}
