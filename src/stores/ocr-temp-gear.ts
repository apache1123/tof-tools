import { createWorker, type Worker } from 'tesseract.js';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Gear } from '../models/gear';
import { newGear } from '../models/gear';
import type { GearType } from '../models/gear-type';

export interface OcrStore {
  ocrWorker: Worker | undefined;
  tempGear: Gear | undefined;
}

export const ocrStore = proxy<OcrStore>({
  ocrWorker: undefined,
  tempGear: undefined,
});
devtools(ocrStore, { name: 'ocr' });

export function newOCRTempGear(gearType: GearType) {
  ocrStore.tempGear = newGear(gearType);
}

export function setOCRTempGear(gear: Gear) {
  ocrStore.tempGear = gear;
}

export function removeOCRTempGear() {
  ocrStore.tempGear = undefined;
}

export async function initializeOCRWorker() {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  ocrStore.ocrWorker = worker;
}
