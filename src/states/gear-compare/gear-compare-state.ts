import { proxy } from "valtio";

import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterPresetId } from "../../models/character/character-preset";
import type { GearId } from "../../models/gear/gear";

export interface GearCompareState {
  characterPresetId: CharacterPresetId | undefined;
  gearTypeId: GearTypeId | undefined;
  newGearId: GearId | undefined;
}

export const gearCompareState = proxy<GearCompareState>({
  characterPresetId: undefined,
  gearTypeId: undefined,
  newGearId: undefined,
});

export const gearCompareStateKey = "gearCompare";
