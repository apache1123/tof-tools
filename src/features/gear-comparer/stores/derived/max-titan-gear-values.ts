import { derive, devtools } from 'valtio/utils';

import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import {
  type GearComparerGearPosition,
  type GearComparerGearsStore,
  gearComparerGearsStore,
} from '../gear-comparer-gear';
import {
  type GearComparerOptionsStore,
  gearComparerOptionsStore,
} from '../gear-comparer-options';
import { type UserStatsStore, userStatsStore } from '../user-stats/user-stats';
import {
  type GearBasisValuesStore,
  gearBasisValuesStore,
} from './gear-basis-values';
import {
  type GearComparerGearMaxTitansStore,
  gearComparerGearMaxTitansStore,
} from './gear-comparer-gear-max-titans';

export type MaxTitanGearValuesStore = Record<
  `${GearComparerGearPosition}MaxTitanValue`,
  number
>;

export const maxTitanGearValuesStore = derive<object, MaxTitanGearValuesStore>({
  GearAMaxTitanValue: (get) =>
    getGearValue(
      'GearA',
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(gearComparerGearMaxTitansStore),
      get(userStatsStore),
      get(gearBasisValuesStore)
    ),
  GearBMaxTitanValue: (get) =>
    getGearValue(
      'GearB',
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(gearComparerGearMaxTitansStore),
      get(userStatsStore),
      get(gearBasisValuesStore)
    ),
});
devtools(maxTitanGearValuesStore, { name: 'maxTitanGearValues' });

function getGearValue(
  gearPosition: GearComparerGearPosition,
  gearComparerGearsStore: GearComparerGearsStore,
  gearComparerOptionsStore: GearComparerOptionsStore,
  gearComparerGearMaxTitansStore: GearComparerGearMaxTitansStore,
  userStatsStore: UserStatsStore,
  gearBasisValuesStore: GearBasisValuesStore
) {
  const referenceGear = gearComparerGearsStore[gearPosition];
  if (!referenceGear) return 0;

  const { selectedElementalType } = gearComparerOptionsStore;

  if (!selectedElementalType) {
    return 0;
  }

  const maxTitanGear =
    gearComparerGearMaxTitansStore.titansByReferenceGearId[referenceGear.id];
  if (!maxTitanGear) return 0;

  const { characterLevel } = userStatsStore;

  const { basisValues } = gearBasisValuesStore;

  return getGearMultiplierRelativeToBasis(
    maxTitanGear,
    basisValues,
    selectedElementalType,
    characterLevel
  );
}
