// import { createWorker, type Worker } from "tesseract.js";
// import { proxy } from "valtio";
// import { devtools } from "valtio/utils";
//
// import { Gear } from "../models/gear/gear";
// import type { GearType } from "../models/gear-type";
//
// export interface OcrState {
//   ocrWorker: Worker | undefined;
//   tempGear: Gear | undefined;
// }
//
// export const ocrState = proxy<OcrState>({
//   ocrWorker: undefined,
//   tempGear: undefined,
// });
// devtools(ocrState, { name: "ocr" });
//
// export function newOCRTempGear(gearType: GearType) {
//   ocrState.tempGear = new Gear(gearType);
// }
//
// export function setOCRTempGear(gear: Gear) {
//   ocrState.tempGear = gear;
// }
//
// export function removeOCRTempGear() {
//   ocrState.tempGear = undefined;
// }
//
// export async function initializeOCRWorker() {
//   if (!ocrState.ocrWorker) {
//     ocrState.ocrWorker = await createWorker("eng");
//   }
// }
