import { derive, devtools } from 'valtio/utils';

import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import {
  type GearComparerGearPosition,
  type GearComparerGearsState,
  gearComparerGearsState,
} from '../gear-comparer-gear';
import {
  type GearComparerOptionsState,
  gearComparerOptionsState,
} from '../gear-comparer-options';
import { type UserStatsState, userStatsState } from '../user-stats/user-stats';
import {
  type GearBasisValuesState,
  gearBasisValuesState,
} from './gear-basis-values';
import {
  type GearComparerGearMaxTitansState,
  gearComparerGearMaxTitansState,
} from './gear-comparer-gear-max-titans';

export type MaxTitanGearValuesState = Record<
  `${GearComparerGearPosition}MaxTitanValue`,
  number
>;

export const maxTitanGearValuesState = derive<object, MaxTitanGearValuesState>({
  GearAMaxTitanValue: (get) =>
    getGearValue(
      'GearA',
      get(gearComparerGearsState),
      get(gearComparerOptionsState),
      get(gearComparerGearMaxTitansState),
      get(userStatsState),
      get(gearBasisValuesState)
    ),
  GearBMaxTitanValue: (get) =>
    getGearValue(
      'GearB',
      get(gearComparerGearsState),
      get(gearComparerOptionsState),
      get(gearComparerGearMaxTitansState),
      get(userStatsState),
      get(gearBasisValuesState)
    ),
});
devtools(maxTitanGearValuesState, { name: 'maxTitanGearValues' });

function getGearValue(
  gearPosition: GearComparerGearPosition,
  gearComparerGearsSnap: GearComparerGearsState,
  gearComparerOptionsSnap: GearComparerOptionsState,
  gearComparerGearMaxTitansSnap: GearComparerGearMaxTitansState,
  userStatsSnap: UserStatsState,
  gearBasisValuesSnap: GearBasisValuesState
) {
  const referenceGear = gearComparerGearsSnap[gearPosition];
  if (!referenceGear) return 0;

  const { selectedElementalType } = gearComparerOptionsSnap;

  if (!selectedElementalType) {
    return 0;
  }

  const maxTitanGear =
    gearComparerGearMaxTitansSnap.titansByReferenceGearId[referenceGear.id];
  if (!maxTitanGear) return 0;

  const { characterLevel } = userStatsSnap;

  const { basisValues } = gearBasisValuesSnap;

  return getGearMultiplierRelativeToBasis(
    maxTitanGear,
    basisValues,
    selectedElementalType,
    characterLevel
  );
}
