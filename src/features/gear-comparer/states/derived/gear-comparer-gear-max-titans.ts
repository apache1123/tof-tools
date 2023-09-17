import { derive, devtools } from 'valtio/utils';

import type { DataById } from '../../../../models/data';
import type { Gear } from '../../../../models/gear';
import { gearComparerGearsState } from '../gear-comparer-gear';
import { gearComparerOptionsState } from '../gear-comparer-options';

export interface GearComparerGearMaxTitansState {
  titansByReferenceGearId: DataById<string, Gear | undefined>;
}

export const gearComparerGearMaxTitansState = derive<
  object,
  GearComparerGearMaxTitansState
>({
  titansByReferenceGearId: (get) => {
    const { GearA, GearB } = get(gearComparerGearsState);
    const { selectedElementalType } = get(gearComparerOptionsState);

    const result: DataById<string, Gear | undefined> = {};

    if (GearA) {
      result[GearA.id] = GearA.getMaxTitanGear(selectedElementalType);
    }
    if (GearB) {
      result[GearB.id] = GearB.getMaxTitanGear(selectedElementalType);
    }

    return result;
  },
});
devtools(gearComparerGearMaxTitansState, { name: 'gearComparerGearMaxTitans' });
