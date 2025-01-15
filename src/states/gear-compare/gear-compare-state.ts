import { proxy } from "valtio";

import type { CharacterPresetId } from "../../models/character/character-preset";

export interface GearCompareState {
  selectedCharacterPresetId: CharacterPresetId | undefined;
}

export const gearCompareState = proxy<GearCompareState>({
  selectedCharacterPresetId: undefined,
});

export const gearCompareStateKey = "gearCompare";
