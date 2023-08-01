import BigNumber from 'bignumber.js';
import { derive, devtools } from 'valtio/utils';

import type { BasisValues } from '../../../../models/basis-values';
import {
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
} from '../../../../models/gear';
import { additiveSum } from '../../../../utils/math-utils';
import {
  calculateCritPercentFromFlat,
  calculateMultiplier,
} from '../../../../utils/stat-calculation-utils';
import type { GearComparerGearsStore } from '../gear-comparer-gear';
import { gearComparerGearsStore } from '../gear-comparer-gear';
import type { GearComparerOptionsStore } from '../gear-comparer-options';
import { gearComparerOptionsStore } from '../gear-comparer-options';
import type { UserStatsStore } from '../user-stats/user-stats';
import { userStatsStore } from '../user-stats/user-stats';
import type { SelectedElementalBuffValuesStore } from './selected-elemental-buff-values';
import { selectedElementalBuffValuesStore } from './selected-elemental-buff-values';
import type { SelectedElementalUserStatsStore } from './selected-elemental-user-stats';
import { selectedElementalUserStatsStore } from './selected-elemental-user-stats';

export interface GearBasisValuesStore {
  basisValues: BasisValues;
}

export const gearBasisValuesStore = derive<object, GearBasisValuesStore>({
  basisValues: (get) =>
    getBasisValues(
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(userStatsStore),
      get(selectedElementalUserStatsStore),
      get(selectedElementalBuffValuesStore)
    ),
});
devtools(gearBasisValuesStore, { name: 'gearBasisValues' });

function getBasisValues(
  gearComparerGearsStore: GearComparerGearsStore,
  gearComparerOptionsStore: GearComparerOptionsStore,
  userStatsStore: UserStatsStore,
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
      basisCritTotalPercent: 0,
      basisCritDamage: 0,
      basisDamage: 0,
      basisPassiveAttackPercent: 0,
      basisPassiveCritPercent: 0,
      basisMultiplier: 0,
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

  const { characterLevel } = userStatsStore;
  const basisCritTotalPercent = additiveSum([
    calculateCritPercentFromFlat(
      BigNumber(basisCritFlat),
      BigNumber(characterLevel)
    ).toNumber(),
    basisCritPercent,
  ]).toNumber();

  const basisCritDamage = additiveSum(
    [critDamageWithoutGearA, miscCritDamage].concat(matrixCritDamageBuffValues)
  ).toNumber();

  const basisDamage = additiveSum([otherGearElementalDamage]).toNumber();

  const basisPassiveAttackPercent = passiveAttackPercentWithoutGearA;
  const basisPassiveCritPercent = critPercentWithoutGearA;

  const basisMultiplier = calculateMultiplier(
    BigNumber(basisAttackFlat),
    BigNumber(basisAttackPercent),
    BigNumber(basisCritTotalPercent),
    BigNumber(basisCritDamage),
    BigNumber(basisDamage)
  ).toNumber();

  return {
    basisAttackFlat,
    basisAttackPercent,
    basisCritFlat,
    basisCritPercent,
    basisCritTotalPercent,
    basisCritDamage,
    basisDamage,
    basisPassiveAttackPercent,
    basisPassiveCritPercent,
    basisMultiplier,
  };
}
