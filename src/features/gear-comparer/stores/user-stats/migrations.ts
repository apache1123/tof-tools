/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { defaultCritDamagePercent } from '../../../../constants/damage-formula';
import { userStatsStore } from './user-stats';

export function migrations() {
  if (Object.hasOwn(userStatsStore, 'otherAttackFlat')) {
    delete userStatsStore.otherAttackFlat;
  }
  if (Object.hasOwn(userStatsStore, 'critFlat')) {
    delete userStatsStore.critFlat;
  }

  if (userStatsStore.baseAttackFlatWithGearA === undefined) {
    userStatsStore.baseAttackFlatWithGearA = 0;
  }
  if (userStatsStore.critFlatWithGearA === undefined) {
    userStatsStore.critFlatWithGearA = 0;
  }

  if (Object.hasOwn(userStatsStore, 'elementalType')) {
    delete userStatsStore.elementalType;
  }
  if (Object.hasOwn(userStatsStore, 'baseAttackFlatWithGearA')) {
    delete userStatsStore.baseAttackFlatWithGearA;
  }
  if (Object.hasOwn(userStatsStore, 'critFlatWithGearA')) {
    delete userStatsStore.critFlatWithGearA;
  }
  if (Object.hasOwn(userStatsStore, 'otherGearAttackPercent')) {
    delete userStatsStore.otherGearAttackPercent;
  }
  if (Object.hasOwn(userStatsStore, 'otherGearElementalDamage')) {
    delete userStatsStore.otherGearElementalDamage;
  }
  if (Object.hasOwn(userStatsStore, 'miscAttackPercent')) {
    delete userStatsStore.miscAttackPercent;
  }
  if (Object.hasOwn(userStatsStore, 'miscCritRate')) {
    delete userStatsStore.miscCritRate;
  }
  if (Object.hasOwn(userStatsStore, 'miscCritDamage')) {
    delete userStatsStore.miscCritDamage;
  }

  if (userStatsStore.statsByElement === undefined) {
    userStatsStore.statsByElement = {
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
    Object.hasOwn(userStatsStore.statsByElement.Flame, 'otherGearAttackPercent')
  ) {
    delete userStatsStore.statsByElement.Flame.otherGearAttackPercent;
  }
  if (
    Object.hasOwn(userStatsStore.statsByElement.Frost, 'otherGearAttackPercent')
  ) {
    delete userStatsStore.statsByElement.Frost.otherGearAttackPercent;
  }
  if (
    Object.hasOwn(
      userStatsStore.statsByElement.Physical,
      'otherGearAttackPercent'
    )
  ) {
    delete userStatsStore.statsByElement.Physical.otherGearAttackPercent;
  }
  if (
    Object.hasOwn(userStatsStore.statsByElement.Volt, 'otherGearAttackPercent')
  ) {
    delete userStatsStore.statsByElement.Volt.otherGearAttackPercent;
  }

  if (
    userStatsStore.statsByElement.Flame.totalAttackFlatWithGearA === undefined
  ) {
    userStatsStore.statsByElement.Flame.totalAttackFlatWithGearA = 0;
  }
  if (
    userStatsStore.statsByElement.Frost.totalAttackFlatWithGearA === undefined
  ) {
    userStatsStore.statsByElement.Frost.totalAttackFlatWithGearA = 0;
  }
  if (
    userStatsStore.statsByElement.Physical.totalAttackFlatWithGearA ===
    undefined
  ) {
    userStatsStore.statsByElement.Physical.totalAttackFlatWithGearA = 0;
  }
  if (
    userStatsStore.statsByElement.Volt.totalAttackFlatWithGearA === undefined
  ) {
    userStatsStore.statsByElement.Volt.totalAttackFlatWithGearA = 0;
  }

  if (userStatsStore.statsByElement.Flame.critPercentWithGearA === undefined) {
    userStatsStore.statsByElement.Flame.critPercentWithGearA = 0;
  }
  if (userStatsStore.statsByElement.Frost.critPercentWithGearA === undefined) {
    userStatsStore.statsByElement.Frost.critPercentWithGearA = 0;
  }
  if (
    userStatsStore.statsByElement.Physical.critPercentWithGearA === undefined
  ) {
    userStatsStore.statsByElement.Physical.critPercentWithGearA = 0;
  }
  if (userStatsStore.statsByElement.Volt.critPercentWithGearA === undefined) {
    userStatsStore.statsByElement.Volt.critPercentWithGearA = 0;
  }

  if (userStatsStore.statsByElement.Flame.critDamageWithGearA === undefined) {
    userStatsStore.statsByElement.Flame.critDamageWithGearA =
      defaultCritDamagePercent;
  }
  if (userStatsStore.statsByElement.Frost.critDamageWithGearA === undefined) {
    userStatsStore.statsByElement.Frost.critDamageWithGearA =
      defaultCritDamagePercent;
  }
  if (
    userStatsStore.statsByElement.Physical.critDamageWithGearA === undefined
  ) {
    userStatsStore.statsByElement.Physical.critDamageWithGearA =
      defaultCritDamagePercent;
  }
  if (userStatsStore.statsByElement.Volt.critDamageWithGearA === undefined) {
    userStatsStore.statsByElement.Volt.critDamageWithGearA =
      defaultCritDamagePercent;
  }
}
