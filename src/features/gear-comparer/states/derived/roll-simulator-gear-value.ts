import { derive } from 'valtio/utils';

import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import { gearComparerOptionsState } from '../gear-comparer-options';
import { rollSimulatorState } from '../roll-simulator';
import { userStatsState } from '../user-stats/user-stats';
import { gearBasisValuesState } from './gear-basis-values';

export interface RollSimulatorGearValueState {
  value: number;
}

export const rollSimulatorGearValueState = derive<
  object,
  RollSimulatorGearValueState
>({
  value: (get) => {
    const { gear } = get(rollSimulatorState);
    const { selectedElementalType } = get(gearComparerOptionsState);
    const { characterLevel } = get(userStatsState);
    const { basisValues } = get(gearBasisValuesState);
    if (!gear || !selectedElementalType) {
      return 0;
    }

    return getGearMultiplierRelativeToBasis(
      gear,
      basisValues,
      selectedElementalType,
      characterLevel
    );
  },
});
