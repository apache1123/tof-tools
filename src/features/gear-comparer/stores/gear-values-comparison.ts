import { derive, devtools } from 'valtio/utils';

import type { GearComparerGearPosition } from './gear-comparer-gear';
import { gearValuesStore } from './gear-values';

export type GearValuesComparisonStore = Record<
  `Is${GearComparerGearPosition}HighestValue`,
  boolean
>;

export const gearValuesComparisonStore = derive<
  object,
  GearValuesComparisonStore
>({
  IsGearAHighestValue: (get): boolean => {
    return get(gearValuesStore).GearAValue > get(gearValuesStore).GearBValue;
  },
  IsGearBHighestValue: (get): boolean => {
    return get(gearValuesStore).GearBValue > get(gearValuesStore).GearAValue;
  },
});
devtools(gearValuesComparisonStore, { name: 'gearValuesComparison' });
