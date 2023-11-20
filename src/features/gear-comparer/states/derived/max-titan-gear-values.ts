import { derive, devtools } from 'valtio/utils';

import type { Gear } from '../../../../models/gear';
import type { GearComparerState } from '../../../../states/gear-comparer';
import { gearComparerState } from '../../../../states/states';
import {
  type GearComparerGearMaxTitansState,
  gearComparerGearMaxTitansState,
} from './gear-comparer-gear-max-titans';

export interface MaxTitanGearValuesState {
  selectedLoadoutGearMaxTitanValue: number;
  replacementGearMaxTitanValue: number;
}

// TODO: redo Titan gear
export const maxTitanGearValuesState = derive<object, MaxTitanGearValuesState>({
  selectedLoadoutGearMaxTitanValue: (get) => {
    const gearSnap = get(gearComparerState).selectedLoadoutGear;
    return getGearValue(
      gearSnap,
      get(gearComparerState),
      get(gearComparerGearMaxTitansState)
    );
  },
  replacementGearMaxTitanValue: (get) => {
    const gearSnap = get(gearComparerState).replacementGear;
    return getGearValue(
      gearSnap,
      get(gearComparerState),
      get(gearComparerGearMaxTitansState)
    );
  },
});
devtools(maxTitanGearValuesState, { name: 'maxTitanGearValues' });

function getGearValue(
  gearSnap: Gear,
  gearComparerSnap: GearComparerState,
  gearComparerGearMaxTitansSnap: GearComparerGearMaxTitansState
): number {
  const { selectedLoadout } = gearComparerSnap;

  const maxTitanGear =
    gearComparerGearMaxTitansSnap.titansByReferenceGearId[gearSnap.id];
  if (!maxTitanGear) return 0;

  return selectedLoadout.getSubstituteGearValue(maxTitanGear);
}
