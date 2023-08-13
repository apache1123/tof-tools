import { derive, devtools } from 'valtio/utils';

import type { GearComparerGearPosition } from '../gear-comparer-gear';
import { gearValuesState } from './gear-values';

export type GearValuesComparisonState = Record<
  `Is${GearComparerGearPosition}HighestValue`,
  boolean
>;

export const gearValuesComparisonState = derive<
  object,
  GearValuesComparisonState
>({
  IsGearAHighestValue: (get): boolean => {
    return get(gearValuesState).GearAValue > get(gearValuesState).GearBValue;
  },
  IsGearBHighestValue: (get): boolean => {
    return get(gearValuesState).GearBValue > get(gearValuesState).GearAValue;
  },
});
devtools(gearValuesComparisonState, { name: 'gearValuesComparison' });
