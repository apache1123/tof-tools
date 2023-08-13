import { derive, devtools } from 'valtio/utils';

import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import type {
  GearComparerGearPosition,
  GearComparerGearsState,
} from '../gear-comparer-gear';
import { gearComparerGearsState } from '../gear-comparer-gear';
import type { GearComparerOptionsState } from '../gear-comparer-options';
import { gearComparerOptionsState } from '../gear-comparer-options';
import type { UserStatsState } from '../user-stats/user-stats';
import { userStatsState } from '../user-stats/user-stats';
import {
  type GearBasisValuesState,
  gearBasisValuesState,
} from './gear-basis-values';

export type GearValuesState = Record<
  `${GearComparerGearPosition}Value`,
  number
>;

export const gearValuesState = derive<object, GearValuesState>({
  GearAValue: (get) => {
    return getGearValue(
      'GearA',
      get(gearComparerGearsState),
      get(gearComparerOptionsState),
      get(userStatsState),
      get(gearBasisValuesState)
    );
  },
  GearBValue: (get) => {
    return getGearValue(
      'GearB',
      get(gearComparerGearsState),
      get(gearComparerOptionsState),
      get(userStatsState),
      get(gearBasisValuesState)
    );
  },
});
devtools(gearValuesState, { name: 'gearValues' });

function getGearValue(
  gearPosition: GearComparerGearPosition,
  gearComparerGearsSnap: GearComparerGearsState,
  gearComparerOptionsSnap: GearComparerOptionsState,
  userStatsSnap: UserStatsState,
  gearBasisValuesSnap: GearBasisValuesState
) {
  const gear = gearComparerGearsSnap[gearPosition];
  if (!gear) return 0;

  const { selectedElementalType } = gearComparerOptionsSnap;

  if (!selectedElementalType) {
    return 0;
  }

  const { characterLevel } = userStatsSnap;

  const { basisValues } = gearBasisValuesSnap;

  return getGearMultiplierRelativeToBasis(
    gear,
    basisValues,
    selectedElementalType,
    characterLevel
  );
}
