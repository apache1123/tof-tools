import { derive, devtools } from 'valtio/utils';

import { maxTitanGearValuesState } from './max-titan-gear-values';

export interface MaxTitanGearValuesComparisonState {
  selectedLoadoutGearMaxTitanHighestValue: boolean;
  replacementGearMaxTitanHighestValue: boolean;
}

// TODO: redo Titan gear
export const maxTitanGearValuesComparisonState = derive<
  object,
  MaxTitanGearValuesComparisonState
>({
  selectedLoadoutGearMaxTitanHighestValue: (get): boolean => {
    return (
      get(maxTitanGearValuesState).selectedLoadoutGearMaxTitanValue >
      get(maxTitanGearValuesState).replacementGearMaxTitanValue
    );
  },
  replacementGearMaxTitanHighestValue: (get): boolean => {
    return (
      get(maxTitanGearValuesState).replacementGearMaxTitanValue >
      get(maxTitanGearValuesState).selectedLoadoutGearMaxTitanValue
    );
  },
});
devtools(maxTitanGearValuesComparisonState, {
  name: 'maxTitanGearValuesComparison',
});
