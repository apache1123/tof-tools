import { derive, devtools } from 'valtio/utils';

import type { DataById } from '../../../../models/data';
import type { Gear } from '../../../../models/gear';
import { getMaxTitanGear } from '../../../../models/gear';
import { gearComparerGearsStore } from '../gear-comparer-gear';
import { gearComparerOptionsStore } from '../gear-comparer-options';

export interface GearComparerGearMaxTitansStore {
  titansByReferenceGearId: DataById<string, Gear | undefined>;
}

export const gearComparerGearMaxTitansStore = derive<
  object,
  GearComparerGearMaxTitansStore
>({
  titansByReferenceGearId: (get) => {
    const { GearA, GearB } = get(gearComparerGearsStore);
    const { selectedElementalType } = get(gearComparerOptionsStore);

    const result: DataById<string, Gear | undefined> = {};

    if (GearA) {
      result[GearA.id] = getMaxTitanGear(GearA, selectedElementalType);
    }
    if (GearB) {
      result[GearB.id] = getMaxTitanGear(GearB, selectedElementalType);
    }

    return result;
  },
});
devtools(gearComparerGearMaxTitansStore, { name: 'gearComparerGearMaxTitans' });
