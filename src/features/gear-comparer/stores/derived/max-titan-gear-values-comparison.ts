import { derive, devtools } from 'valtio/utils';

import type { GearComparerGearPosition } from '../gear-comparer-gear';
import { maxTitanGearValuesStore } from './max-titan-gear-values';

export type MaxTitanGearValuesComparisonStore = Record<
  `Is${GearComparerGearPosition}MaxTitanHighestValue`,
  boolean
>;

export const maxTitanGearValuesComparisonStore = derive<
  object,
  MaxTitanGearValuesComparisonStore
>({
  IsGearAMaxTitanHighestValue: (get): boolean => {
    return (
      get(maxTitanGearValuesStore).GearAMaxTitanValue >
      get(maxTitanGearValuesStore).GearBMaxTitanValue
    );
  },
  IsGearBMaxTitanHighestValue: (get): boolean => {
    return (
      get(maxTitanGearValuesStore).GearBMaxTitanValue >
      get(maxTitanGearValuesStore).GearAMaxTitanValue
    );
  },
});
devtools(maxTitanGearValuesComparisonStore, {
  name: 'maxTitanGearValuesComparison',
});
