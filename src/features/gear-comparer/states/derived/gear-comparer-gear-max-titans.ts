import { derive, devtools } from 'valtio/utils';

import type { DataById } from '../../../../models/data';
import type { Gear } from '../../../../models/gear';
import { gearComparerState } from '../../../../states/states';

export interface GearComparerGearMaxTitansState {
  titansByReferenceGearId: DataById<string, Gear | undefined>;
}

// TODO: redo Titan gear
export const gearComparerGearMaxTitansState = derive<
  object,
  GearComparerGearMaxTitansState
>({
  titansByReferenceGearId: (get) => {
    const {
      selectedLoadoutGear,
      replacementGear,
      selectedLoadout: { elementalType },
    } = get(gearComparerState);

    const result: DataById<string, Gear | undefined> = {};
    result[selectedLoadoutGear.id] =
      selectedLoadoutGear.getMaxTitanGear(elementalType);
    result[replacementGear.id] = replacementGear.getMaxTitanGear(elementalType);

    return result;
  },
});
devtools(gearComparerGearMaxTitansState, { name: 'gearComparerGearMaxTitans' });
