import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Gear } from '../../../models/gear';

export type GearComparerGearPosition = 'GearA' | 'GearB';

export type GearComparerGearsStore = Record<
  GearComparerGearPosition,
  Gear | undefined
>;

export const gearComparerGearsStoreKey = 'gearComparerGears';

export const gearComparerGearsStore = proxy<GearComparerGearsStore>({
  GearA: undefined,
  GearB: undefined,
});
devtools(gearComparerGearsStore, { name: gearComparerGearsStoreKey });

export function setGear(position: GearComparerGearPosition, gear: Gear) {
  gearComparerGearsStore[position] = gear;
}
