/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { defaultCritDamagePercent } from '../../../../constants/damage-formula';
import { userStatsState } from './user-stats';

export function migrations() {
  if (Object.hasOwn(userStatsState, 'otherAttackFlat')) {
    delete userStatsState.otherAttackFlat;
  }
  if (Object.hasOwn(userStatsState, 'critFlat')) {
    delete userStatsState.critFlat;
  }

  if (userStatsState.baseAttackFlatWithGearA === undefined) {
    userStatsState.baseAttackFlatWithGearA = 0;
  }
  if (userStatsState.critFlatWithGearA === undefined) {
    userStatsState.critFlatWithGearA = 0;
  }

  if (Object.hasOwn(userStatsState, 'elementalType')) {
    delete userStatsState.elementalType;
  }
  if (Object.hasOwn(userStatsState, 'baseAttackFlatWithGearA')) {
    delete userStatsState.baseAttackFlatWithGearA;
  }
  if (Object.hasOwn(userStatsState, 'critFlatWithGearA')) {
    delete userStatsState.critFlatWithGearA;
  }
  if (Object.hasOwn(userStatsState, 'otherGearAttackPercent')) {
    delete userStatsState.otherGearAttackPercent;
  }
  if (Object.hasOwn(userStatsState, 'otherGearElementalDamage')) {
    delete userStatsState.otherGearElementalDamage;
  }
  if (Object.hasOwn(userStatsState, 'miscAttackPercent')) {
    delete userStatsState.miscAttackPercent;
  }
  if (Object.hasOwn(userStatsState, 'miscCritRate')) {
    delete userStatsState.miscCritRate;
  }
  if (Object.hasOwn(userStatsState, 'miscCritDamage')) {
    delete userStatsState.miscCritDamage;
  }

  if (userStatsState.statsByElement === undefined) {
    userStatsState.statsByElement = {
      Flame: {
        baseAttackFlatWithGearA: 0,
        critFlatWithGearA: 0,
        otherGearAttackPercent: 0,
        otherGearElementalDamage: 0,
        miscAttackPercent: 0,
        miscCritRate: 0,
        miscCritDamage: 0,
      },
      Frost: {
        baseAttackFlatWithGearA: 0,
        critFlatWithGearA: 0,
        otherGearAttackPercent: 0,
        otherGearElementalDamage: 0,
        miscAttackPercent: 0,
        miscCritRate: 0,
        miscCritDamage: 0,
      },
      Physical: {
        baseAttackFlatWithGearA: 0,
        critFlatWithGearA: 0,
        otherGearAttackPercent: 0,
        otherGearElementalDamage: 0,
        miscAttackPercent: 0,
        miscCritRate: 0,
        miscCritDamage: 0,
      },
      Volt: {
        baseAttackFlatWithGearA: 0,
        critFlatWithGearA: 0,
        otherGearAttackPercent: 0,
        otherGearElementalDamage: 0,
        miscAttackPercent: 0,
        miscCritRate: 0,
        miscCritDamage: 0,
      },
    };
  }

  if (
    Object.hasOwn(userStatsState.statsByElement.Flame, 'otherGearAttackPercent')
  ) {
    delete userStatsState.statsByElement.Flame.otherGearAttackPercent;
  }
  if (
    Object.hasOwn(userStatsState.statsByElement.Frost, 'otherGearAttackPercent')
  ) {
    delete userStatsState.statsByElement.Frost.otherGearAttackPercent;
  }
  if (
    Object.hasOwn(
      userStatsState.statsByElement.Physical,
      'otherGearAttackPercent'
    )
  ) {
    delete userStatsState.statsByElement.Physical.otherGearAttackPercent;
  }
  if (
    Object.hasOwn(userStatsState.statsByElement.Volt, 'otherGearAttackPercent')
  ) {
    delete userStatsState.statsByElement.Volt.otherGearAttackPercent;
  }

  if (
    userStatsState.statsByElement.Flame.totalAttackFlatWithGearA === undefined
  ) {
    userStatsState.statsByElement.Flame.totalAttackFlatWithGearA = 0;
  }
  if (
    userStatsState.statsByElement.Frost.totalAttackFlatWithGearA === undefined
  ) {
    userStatsState.statsByElement.Frost.totalAttackFlatWithGearA = 0;
  }
  if (
    userStatsState.statsByElement.Physical.totalAttackFlatWithGearA ===
    undefined
  ) {
    userStatsState.statsByElement.Physical.totalAttackFlatWithGearA = 0;
  }
  if (
    userStatsState.statsByElement.Volt.totalAttackFlatWithGearA === undefined
  ) {
    userStatsState.statsByElement.Volt.totalAttackFlatWithGearA = 0;
  }

  if (userStatsState.statsByElement.Flame.critPercentWithGearA === undefined) {
    userStatsState.statsByElement.Flame.critPercentWithGearA = 0;
  }
  if (userStatsState.statsByElement.Frost.critPercentWithGearA === undefined) {
    userStatsState.statsByElement.Frost.critPercentWithGearA = 0;
  }
  if (
    userStatsState.statsByElement.Physical.critPercentWithGearA === undefined
  ) {
    userStatsState.statsByElement.Physical.critPercentWithGearA = 0;
  }
  if (userStatsState.statsByElement.Volt.critPercentWithGearA === undefined) {
    userStatsState.statsByElement.Volt.critPercentWithGearA = 0;
  }

  if (userStatsState.statsByElement.Flame.critDamageWithGearA === undefined) {
    userStatsState.statsByElement.Flame.critDamageWithGearA =
      defaultCritDamagePercent;
  }
  if (userStatsState.statsByElement.Frost.critDamageWithGearA === undefined) {
    userStatsState.statsByElement.Frost.critDamageWithGearA =
      defaultCritDamagePercent;
  }
  if (
    userStatsState.statsByElement.Physical.critDamageWithGearA === undefined
  ) {
    userStatsState.statsByElement.Physical.critDamageWithGearA =
      defaultCritDamagePercent;
  }
  if (userStatsState.statsByElement.Volt.critDamageWithGearA === undefined) {
    userStatsState.statsByElement.Volt.critDamageWithGearA =
      defaultCritDamagePercent;
  }
}
