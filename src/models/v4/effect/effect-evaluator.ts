import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import type { Team } from '../../team';
import type { AttackResult } from '../attack/attack-result';
import type { EffectController } from './effect-controller';
import type { EffectDefinition } from './effect-definition';
import type { EffectRegistry } from './effect-registry';

export class EffectEvaluator {
  public constructor(
    private readonly attackResult: AttackResult,
    private readonly effectController: EffectController<EffectDefinition>,
    private readonly effectRegistry: EffectRegistry,
    private readonly team: Team
  ) {}

  public isEffectOnCooldown(): boolean {
    const { startTime } = this.attackResult;
    return this.effectController.isEffectOnCooldownAt(startTime);
  }

  public canEffectBeTriggered(): boolean {
    const { triggeredBy } = this.effectController.definition;

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
    } = this.attackResult;

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
    const { requirements } = this.effectController.definition;
    if (!requirements) return true;

    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.team;

    // Check requirements from most specific to least specific for efficiency

    if (requirements.activeEffect) {
      const effectController = this.effectRegistry.getEffectController(
        requirements.activeEffect
      );
      return (
        effectController?.isEffectActiveAt(this.attackResult.startTime) ?? false
      );
    }

    if (
      requirements.anyWeaponInTeam &&
      requirements.anyWeaponInTeam.every(
        (weaponName) => !weaponNames.includes(weaponName)
      )
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

  public calculateEffectTimePeriod():
    | { startTime: number; duration: number }
    | undefined {
    const {
      duration: {
        value,
        followActiveWeapon,
        applyToEndSegmentOfCombat,
        untilCombatEnd,
      },
    } = this.effectController.definition;
    const { startTime, duration } = this.attackResult;

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
      const duration = BigNumber(this.effectController.totalDuration)
        .times(applyToEndSegmentOfCombat)
        .toNumber();
      const startTime = BigNumber(this.effectController.totalDuration)
        .minus(duration)
        .toNumber();

      return { startTime, duration };
    }
    if (untilCombatEnd) {
      return {
        startTime,
        duration: BigNumber(this.effectController.totalDuration)
          .minus(startTime)
          .toNumber(),
      };
    }

    return undefined;
  }
}
