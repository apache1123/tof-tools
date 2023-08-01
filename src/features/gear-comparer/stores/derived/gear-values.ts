import { derive, devtools } from 'valtio/utils';

import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import type {
  GearComparerGearPosition,
  GearComparerGearsStore,
} from '../gear-comparer-gear';
import { gearComparerGearsStore } from '../gear-comparer-gear';
import type { GearComparerOptionsStore } from '../gear-comparer-options';
import { gearComparerOptionsStore } from '../gear-comparer-options';
import type { UserStatsStore } from '../user-stats/user-stats';
import { userStatsStore } from '../user-stats/user-stats';
import {
  type GearBasisValuesStore,
  gearBasisValuesStore,
} from './gear-basis-values';

export type GearValuesStore = Record<
  `${GearComparerGearPosition}Value`,
  number
>;

export const gearValuesStore = derive<object, GearValuesStore>({
  GearAValue: (get) => {
    return getGearValue(
      'GearA',
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(userStatsStore),
      get(gearBasisValuesStore)
    );
  },
  GearBValue: (get) => {
    return getGearValue(
      'GearB',
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(userStatsStore),
      get(gearBasisValuesStore)
    );
  },
});
devtools(gearValuesStore, { name: 'gearValues' });

function getGearValue(
  gearPosition: GearComparerGearPosition,
  gearComparerGearsStore: GearComparerGearsStore,
  gearComparerOptionsStore: GearComparerOptionsStore,
  userStatsStore: UserStatsStore,
  gearBasisValuesStore: GearBasisValuesStore
) {
  const gear = gearComparerGearsStore[gearPosition];
  if (!gear) return 0;

  const { selectedElementalType } = gearComparerOptionsStore;

  if (!selectedElementalType) {
    return 0;
  }

  const { characterLevel } = userStatsStore;

  const { basisValues } = gearBasisValuesStore;

  return getGearMultiplierRelativeToBasis(
    gear,
    basisValues,
    selectedElementalType,
    characterLevel
  );
}
