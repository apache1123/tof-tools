import { createWorker, type Worker } from "tesseract.js";
import { proxy } from "valtio";

export interface OcrState {
  worker: Worker | undefined;
  initializeWorker(): Promise<void>;
}

export const ocrState = proxy<OcrState>({
  worker: undefined,
  async initializeWorker() {
    if (!ocrState.worker) {
      ocrState.worker = await createWorker("eng");
    }
  },
});
