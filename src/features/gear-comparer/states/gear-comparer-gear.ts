import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { type Gear } from '../../../models/gear';

// GearA a.k.a "Current gear"; GearB a.k.a "New gear"
export type GearComparerGearPosition = 'GearA' | 'GearB';

export type GearComparerGearsState = Record<
  GearComparerGearPosition,
  Gear | undefined
>;

export const gearComparerGearsStateKey = 'gearComparerGears';

export const gearComparerGearsState = proxy<GearComparerGearsState>({
  GearA: undefined,
  GearB: undefined,
});
devtools(gearComparerGearsState, { name: gearComparerGearsStateKey });

export function setGear(position: GearComparerGearPosition, gear: Gear) {
  gearComparerGearsState[position] = gear;
}
