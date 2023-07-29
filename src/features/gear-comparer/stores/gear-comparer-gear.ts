import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Gear } from '../../../models/gear';

// GearA a.k.a "Current gear"; GearB a.k.a "New gear"
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

export function swapPositions() {
  const temp = gearComparerGearsStore.GearA;
  gearComparerGearsStore.GearA = gearComparerGearsStore.GearB;
  gearComparerGearsStore.GearB = temp;
}
