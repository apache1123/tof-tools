import { derive } from 'valtio/utils';

import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import { gearComparerOptionsStore } from '../gear-comparer-options';
import { rollSimulatorStore } from '../roll-simulator';
import { userStatsStore } from '../user-stats/user-stats';
import { gearBasisValuesStore } from './gear-basis-values';

export interface RollSimulatorGearValueStore {
  value: number;
}

export const rollSimulatorGearValueStore = derive<
  object,
  RollSimulatorGearValueStore
>({
  value: (get) => {
    const { gear } = get(rollSimulatorStore);
    const { selectedElementalType } = get(gearComparerOptionsStore);
    const { characterLevel } = get(userStatsStore);
    const { basisValues } = get(gearBasisValuesStore);
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
