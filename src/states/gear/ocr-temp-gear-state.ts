import { proxy } from "valtio";

import type { Gear } from "../../models/gear/gear";

export interface OcrTempGearState {
  tempGear: Gear | undefined;
}

export const ocrTempGearState = proxy<OcrTempGearState>({
  tempGear: undefined,
});
