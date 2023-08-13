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
import type { GearComparerGearsState } from '../gear-comparer-gear';
import { gearComparerGearsState } from '../gear-comparer-gear';
import type { GearComparerOptionsState } from '../gear-comparer-options';
import { gearComparerOptionsState } from '../gear-comparer-options';
import type { UserStatsState } from '../user-stats/user-stats';
import { userStatsState } from '../user-stats/user-stats';
import type { SelectedElementalBuffValuesState } from './selected-elemental-buff-values';
import { selectedElementalBuffValuesState } from './selected-elemental-buff-values';
import type { SelectedElementalUserStatsState } from './selected-elemental-user-stats';
import { selectedElementalUserStatsState } from './selected-elemental-user-stats';

export interface GearBasisValuesState {
  basisValues: BasisValues;
}

export const gearBasisValuesState = derive<object, GearBasisValuesState>({
  basisValues: (get) =>
    getBasisValues(
      get(gearComparerGearsState),
      get(gearComparerOptionsState),
      get(userStatsState),
      get(selectedElementalUserStatsState),
      get(selectedElementalBuffValuesState)
    ),
});
devtools(gearBasisValuesState, { name: 'gearBasisValues' });

function getBasisValues(
  gearComparerGearsSnap: GearComparerGearsState,
  gearComparerOptionsSnap: GearComparerOptionsState,
  userStatsSnap: UserStatsState,
  selectedElementalUserStatsSnap: SelectedElementalUserStatsState,
  selectedElementalBuffValuesSnap: SelectedElementalBuffValuesState
): BasisValues {
  const { selectedElementalType } = gearComparerOptionsSnap;
  const { selectedElementalUserStats } = selectedElementalUserStatsSnap;

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

  const gearA = gearComparerGearsSnap.GearA;
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
  } = selectedElementalBuffValuesSnap;

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

  const { characterLevel } = userStatsSnap;
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
