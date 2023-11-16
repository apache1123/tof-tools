import { derive } from 'valtio/utils';

import { gearComparerState, userStatsState } from '../../../../states/states';
import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import { rollSimulatorState } from '../roll-simulator';
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
    const {
      selectedLoadout: { elementalType },
    } = get(gearComparerState);
    const { characterLevel } = get(userStatsState);
    const { basisValues } = get(gearBasisValuesState);
    if (!gear) {
      return 0;
    }

    return getGearMultiplierRelativeToBasis(
      gear,
      basisValues,
      elementalType,
      characterLevel
    );
  },
});
