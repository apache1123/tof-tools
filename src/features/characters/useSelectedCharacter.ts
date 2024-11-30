import { useSnapshot } from "valtio/index";

import type { Character } from "../../models/character/character";
import { charactersState } from "../../states/states";

export function useSelectedCharacter() {
  const snap = useSnapshot(charactersState);

  return {
    selectedCharacterState: charactersState.selected,
    selectedCharacterSnap: snap.selected as Character | undefined,
  };
}
