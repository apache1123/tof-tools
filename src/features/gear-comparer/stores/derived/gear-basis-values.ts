import BigNumber from 'bignumber.js';
import { derive, devtools } from 'valtio/utils';

import {
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
} from '../../../../models/gear';
import { additiveSum } from '../../../../utils/math-utils';
import type { GearComparerGearsStore } from '../gear-comparer-gear';
import { gearComparerGearsStore } from '../gear-comparer-gear';
import type { GearComparerOptionsStore } from '../gear-comparer-options';
import { gearComparerOptionsStore } from '../gear-comparer-options';
import type { SelectedElementalBuffValuesStore } from './selected-elemental-buff-values';
import { selectedElementalBuffValuesStore } from './selected-elemental-buff-values';
import type { SelectedElementalUserStatsStore } from './selected-elemental-user-stats';
import { selectedElementalUserStatsStore } from './selected-elemental-user-stats';

// Basis values is the values of all the user stats and selected buffs, minus the values GearA contributes i.e. providing the common basis for comparing GearA & GearB
export interface BasisValues {
  basisAttackFlat: number;
  basisAttackPercent: number;
  basisCritFlat: number;
  basisCritPercent: number;
  basisCritDamage: number;
  basisDamage: number;
}

export interface GearBasisValuesStore {
  basisValues: BasisValues;
}

export const gearBasisValuesStore = derive<object, GearBasisValuesStore>({
  basisValues: (get) =>
    getBasisValues(
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(selectedElementalUserStatsStore),
      get(selectedElementalBuffValuesStore)
    ),
});
devtools(gearBasisValuesStore, { name: 'gearBasisValues' });

function getBasisValues(
  gearComparerGearsStore: GearComparerGearsStore,
  gearComparerOptionsStore: GearComparerOptionsStore,
  selectedElementalUserStatsStore: SelectedElementalUserStatsStore,
  selectedElementalBuffValuesStore: SelectedElementalBuffValuesStore
): BasisValues {
  const { selectedElementalType } = gearComparerOptionsStore;
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;

  if (!selectedElementalType || !selectedElementalUserStats) {
    return {
      basisAttackFlat: 0,
      basisAttackPercent: 0,
      basisCritFlat: 0,
      basisCritPercent: 0,
      basisCritDamage: 0,
      basisDamage: 0,
    };
  }

  const {
    baseAttackFlatWithGearA,
    totalAttackFlatWithGearA,
    critFlatWithGearA,
    critPercentWithGearA,
    critDamageWithGearA,
    otherGearElementalDamage,
    miscAttackPercent,
    miscCritRate,
    miscCritDamage,
  } = selectedElementalUserStats;

  const passiveAttackPercentWithGearA = BigNumber(totalAttackFlatWithGearA)
    .minus(baseAttackFlatWithGearA)
    .dividedBy(baseAttackFlatWithGearA);

  const gearA = gearComparerGearsStore.GearA;
  const attackFlatWithoutGearA = BigNumber(baseAttackFlatWithGearA)
    .minus(gearA ? getTotalAttackFlat(gearA, selectedElementalType) : 0)
    .toNumber();
  const passiveAttackPercentWithoutGearA = passiveAttackPercentWithGearA
    .minus(gearA ? getTotalAttackPercent(gearA, selectedElementalType) : 0)
    .toNumber();
  const critFlatWithoutGearA = BigNumber(critFlatWithGearA)
    .minus(gearA ? getTotalCritFlat(gearA) : 0)
    .toNumber();
  const critPercentWithoutGearA = BigNumber(critPercentWithGearA)
    .minus(gearA ? getTotalCritPercent(gearA) : 0)
    .toNumber();
  const critDamageWithoutGearA = critDamageWithGearA;

  const {
    weaponAttackBuffValues,
    matrixAttackBuffValues,
    weaponCritRateBuffValues,
    matrixCritRateBuffValues,
    matrixCritDamageBuffValues,
  } = selectedElementalBuffValuesStore;

  const basisAttackFlat = attackFlatWithoutGearA;

  const basisAttackPercent = additiveSum(
    [passiveAttackPercentWithoutGearA, miscAttackPercent]
      .concat(weaponAttackBuffValues)
      .concat(matrixAttackBuffValues)
  ).toNumber();

  const basisCritFlat = critFlatWithoutGearA;

  const basisCritPercent = additiveSum(
    [critPercentWithoutGearA, miscCritRate]
      .concat(weaponCritRateBuffValues)
      .concat(matrixCritRateBuffValues)
  ).toNumber();

  const basisCritDamage = additiveSum(
    [critDamageWithoutGearA, miscCritDamage].concat(matrixCritDamageBuffValues)
  ).toNumber();

  const basisDamage = additiveSum([otherGearElementalDamage]).toNumber();

  return {
    basisAttackFlat,
    basisAttackPercent,
    basisCritFlat,
    basisCritPercent,
    basisCritDamage,
    basisDamage,
  };
}
