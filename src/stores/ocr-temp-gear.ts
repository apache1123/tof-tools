import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Gear } from '../models/gear';
import { newGear } from '../models/gear';
import type { GearType } from '../models/gear-type';

export const ocrTempGearStore = proxy<{ gear: Gear | undefined }>({
  gear: undefined,
});
devtools(ocrTempGearStore, { name: 'ocrTempGear' });

export function newOCRTempGear(gearType: GearType) {
  ocrTempGearStore.gear = newGear(gearType);
}

export function setOCRTempGear(gear: Gear) {
  ocrTempGearStore.gear = gear;
}

export function removeOCRTempGear() {
  ocrTempGearStore.gear = undefined;
}
