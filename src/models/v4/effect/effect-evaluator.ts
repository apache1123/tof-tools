import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import type { Team } from '../../team';
import type { AttackEvent } from '../timelines/attack-event';
import type { Effect } from './effect';
import type { EffectPool } from './effect-pool';

export class EffectEvaluator {
  public constructor(
    private readonly effect: Effect,
    private readonly attackEvent: AttackEvent,
    private readonly effectPool: EffectPool,
    private readonly team: Team,
    private readonly combatDuration: number
  ) {}

  public canEffectTrigger(): boolean {
    const { triggeredBy } = this.effect.effectDefinition;

    const {
      attackDefinition: { id: attackId, type: attackType },
      weapon: {
        definition: {
          id: weaponId,
          type: weaponType,
          resonanceElements: weaponElementalTypes,
        },
      },
      startTime,
    } = this.attackEvent;

    // Check triggers from least specific to most specific for efficiency

    if (triggeredBy.combatStart && startTime === 0) return true;

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

    if (triggeredBy.notActiveWeapon && weaponId !== triggeredBy.notActiveWeapon)
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

  public hasEffectMetRequirements(): boolean {
    const { requirements } = this.effect.effectDefinition;
    if (!requirements) return true;

    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.team;

    // Check requirements from most specific to least specific for efficiency

    if (requirements.activeEffect) {
      const effect = this.effectPool.getEffect(requirements.activeEffect);
      return effect?.isActiveAt(this.attackEvent.startTime) ?? false;
    }

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
          !weapon.definition.resonanceElements.includes(
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

  public determineEffectTimePeriod():
    | { startTime: number; duration: number }
    | undefined {
    const {
      duration: {
        value,
        followActiveWeapon,
        applyToEndSegmentOfCombat,
        untilCombatEnd,
      },
    } = this.effect.effectDefinition;
    const { startTime, duration } = this.attackEvent;

    if (value) {
      return { startTime, duration: value };
    }
    if (followActiveWeapon) {
      return {
        startTime,
        duration,
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
        startTime,
        duration: BigNumber(this.combatDuration).minus(startTime).toNumber(),
      };
    }

    return undefined;
  }
}
