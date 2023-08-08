import { derive, devtools } from 'valtio/utils';

import type { DataById } from '../../../../models/data';
import type { Gear } from '../../../../models/gear';
import { getMaxTitanGear } from '../../../../models/gear';
import { gearComparerGearsStore } from '../gear-comparer-gear';

export interface GearComparerGearMaxTitansStore {
  titansByReferenceGearId: DataById<string, Gear>;
}

export const gearComparerGearMaxTitansStore = derive<
  object,
  GearComparerGearMaxTitansStore
>({
  titansByReferenceGearId: (get) => {
    const { GearA, GearB } = get(gearComparerGearsStore);

    const result: DataById<string, Gear> = {};

    if (GearA) {
      result[GearA.id] = getMaxTitanGear(GearA);
    }
    if (GearB) {
      result[GearB.id] = getMaxTitanGear(GearB);
    }

    return result;
  },
});
devtools(gearComparerGearMaxTitansStore, { name: 'gearComparerGearMaxTitans' });
