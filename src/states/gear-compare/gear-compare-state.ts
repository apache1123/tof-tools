import { proxy } from "valtio";

import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterPresetId } from "../../models/character/character-preset";

export interface GearCompareState {
  characterPresetId: CharacterPresetId | undefined;
  gearTypeId: GearTypeId | undefined;
}

export const gearCompareState = proxy<GearCompareState>({
  characterPresetId: undefined,
  gearTypeId: undefined,
});

export const gearCompareStateKey = "gearCompare";
