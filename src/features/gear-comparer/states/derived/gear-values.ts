import { derive, devtools } from 'valtio/utils';

import type { Gear } from '../../../../models/gear';
import type { GearComparerState } from '../../../../states/gear-comparer';
import { gearComparerState, userStatsState } from '../../../../states/states';
import type { UserStatsState } from '../../../../states/user-stats';
import { getGearMultiplierRelativeToBasis } from '../../../../utils/gear-calculation-utils';
import {
  type GearBasisValuesState,
  gearBasisValuesState,
} from './gear-basis-values';

export interface GearValuesState {
  selectedLoadoutGearValue: number;
  replacementGearValue: number;
}

export const gearValuesState = derive<object, GearValuesState>({
  selectedLoadoutGearValue: (get) => {
    const gearSnap = get(gearComparerState).selectedLoadoutGear;
    return getGearValue(
      gearSnap,
      get(gearComparerState),
      get(userStatsState),
      get(gearBasisValuesState)
    );
  },
  replacementGearValue: (get) => {
    const gearSnap = get(gearComparerState).replacementGear;
    return getGearValue(
      gearSnap,
      get(gearComparerState),
      get(userStatsState),
      get(gearBasisValuesState)
    );
  },
});
devtools(gearValuesState, { name: 'gearValues' });

function getGearValue(
  gearSnap: Gear,
  gearComparerSnap: GearComparerState,
  userStatsSnap: UserStatsState,
  gearBasisValuesSnap: GearBasisValuesState
) {
  const {
    selectedLoadout: { elementalType },
  } = gearComparerSnap;
  const { characterLevel } = userStatsSnap;
  const { basisValues } = gearBasisValuesSnap;

  return getGearMultiplierRelativeToBasis(
    gearSnap,
    basisValues,
    elementalType,
    characterLevel
  );
}
