import { useSnapshot } from "valtio/index";

import { characterState } from "../../states/character/character-state";
import { useRepositoryItem } from "../common/useRepositoryItem";

export function useSelectedCharacter() {
  const { selectedId } = useSnapshot(characterState);

  const { item, itemProxy } = useRepositoryItem("characters", (repository) => {
    return selectedId ? repository.find(selectedId) : undefined;
  });

  return {
    characterData: item,
    characterDataProxy: itemProxy,
  };
}
