import { useSnapshot } from "valtio/index";

import { db } from "../../db/reactive-local-storage-db";
import { characterState } from "../../states/character/character-state";

export function useSelectedCharacter() {
  const characterRepository = db.get("characters");

  const { selectedId } = useSnapshot(characterState);

  const selectedCharacterProxy = selectedId
    ? characterRepository.find(selectedId)
    : undefined;

  return {
    selectedCharacterId: selectedId,
    selectedCharacterProxy,
  };
}
