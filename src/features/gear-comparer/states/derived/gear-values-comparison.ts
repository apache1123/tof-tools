import { derive, devtools } from 'valtio/utils';

import { gearValuesState } from './gear-values';

export interface GearValuesComparisonState {
  selectedLoadoutGearHighestValue: boolean;
  replacementGearHighestValue: boolean;
}

export const gearValuesComparisonState = derive<
  object,
  GearValuesComparisonState
>({
  selectedLoadoutGearHighestValue: (get): boolean => {
    return (
      get(gearValuesState).selectedLoadoutGearValue >
      get(gearValuesState).replacementGearValue
    );
  },
  replacementGearHighestValue: (get): boolean => {
    return (
      get(gearValuesState).replacementGearValue >
      get(gearValuesState).selectedLoadoutGearValue
    );
  },
});
devtools(gearValuesComparisonState, { name: 'gearValuesComparison' });
