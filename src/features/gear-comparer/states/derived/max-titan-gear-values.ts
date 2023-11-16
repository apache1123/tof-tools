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
import {
  type GearComparerGearMaxTitansState,
  gearComparerGearMaxTitansState,
} from './gear-comparer-gear-max-titans';

export interface MaxTitanGearValuesState {
  selectedLoadoutGearMaxTitanValue: number;
  replacementGearMaxTitanValue: number;
}

export const maxTitanGearValuesState = derive<object, MaxTitanGearValuesState>({
  selectedLoadoutGearMaxTitanValue: (get) => {
    const gearSnap = get(gearComparerState).selectedLoadoutGear;
    return getGearValue(
      gearSnap,
      get(gearComparerState),
      get(gearComparerGearMaxTitansState),
      get(userStatsState),
      get(gearBasisValuesState)
    );
  },
  replacementGearMaxTitanValue: (get) => {
    const gearSnap = get(gearComparerState).replacementGear;
    return getGearValue(
      gearSnap,
      get(gearComparerState),
      get(gearComparerGearMaxTitansState),
      get(userStatsState),
      get(gearBasisValuesState)
    );
  },
});
devtools(maxTitanGearValuesState, { name: 'maxTitanGearValues' });

function getGearValue(
  gearSnap: Gear,
  gearComparerSnap: GearComparerState,
  gearComparerGearMaxTitansSnap: GearComparerGearMaxTitansState,
  userStatsSnap: UserStatsState,
  gearBasisValuesSnap: GearBasisValuesState
) {
  const {
    selectedLoadout: { elementalType },
  } = gearComparerSnap;

  const maxTitanGear =
    gearComparerGearMaxTitansSnap.titansByReferenceGearId[gearSnap.id];
  if (!maxTitanGear) return 0;

  const { characterLevel } = userStatsSnap;

  const { basisValues } = gearBasisValuesSnap;

  return getGearMultiplierRelativeToBasis(
    maxTitanGear,
    basisValues,
    elementalType,
    characterLevel
  );
}
