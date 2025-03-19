import { useProxy } from "valtio/utils";

import { gearCompareState } from "../../../states/gear-compare/gear-compare-state";
import { useRepositoryItem } from "../../common/useRepositoryItem";

export function useCharacterPreset() {
  const { characterPresetId } = useProxy(gearCompareState);

  const { item, itemProxy } = useRepositoryItem(
    "characterPresets",
    (repository) => {
      return characterPresetId ? repository.find(characterPresetId) : undefined;
    },
  );

  return {
    characterPreset: item,
    characterPresetProxy: itemProxy,
  };
}
