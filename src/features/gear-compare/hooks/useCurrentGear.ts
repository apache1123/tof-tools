import { useProxy } from "valtio/utils";

import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import { gearCompareState } from "../../../states/gear-compare/gear-compare-state";
import { useCharacterPreset } from "./useCharacterPreset";

export function useCurrentGear() {
  const { gearTypeId } = useProxy(gearCompareState);

  const { characterPreset, characterPresetProxy } = useCharacterPreset();

  const getCurrentGear = (characterPreset: CharacterPreset | undefined) => {
    return characterPreset && gearTypeId
      ? characterPreset.gearSetPreset?.gearSet.getSlot(gearTypeId).gear
      : undefined;
  };
  const currentGear = getCurrentGear(characterPreset);
  const currentGearProxy = getCurrentGear(characterPresetProxy);

  return { currentGear, currentGearProxy };
}
