import { derive, devtools } from 'valtio/utils';

import type { GearComparerGearPosition } from '../gear-comparer-gear';
import { maxTitanGearValuesState } from './max-titan-gear-values';

export type MaxTitanGearValuesComparisonState = Record<
  `Is${GearComparerGearPosition}MaxTitanHighestValue`,
  boolean
>;

export const maxTitanGearValuesComparisonState = derive<
  object,
  MaxTitanGearValuesComparisonState
>({
  IsGearAMaxTitanHighestValue: (get): boolean => {
    return (
      get(maxTitanGearValuesState).GearAMaxTitanValue >
      get(maxTitanGearValuesState).GearBMaxTitanValue
    );
  },
  IsGearBMaxTitanHighestValue: (get): boolean => {
    return (
      get(maxTitanGearValuesState).GearBMaxTitanValue >
      get(maxTitanGearValuesState).GearAMaxTitanValue
    );
  },
});
devtools(maxTitanGearValuesComparisonState, {
  name: 'maxTitanGearValuesComparison',
});
