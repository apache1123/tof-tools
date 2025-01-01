import { useSnapshot } from "valtio";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import type { CharacterPreset } from "../../models/character/character-preset";

export function useCharacterPresets(characterId: CharacterId) {
  return useSnapshot(db.get("characterPresets")).filter(
    (characterPreset) => characterPreset.characterId === characterId,
  ) as CharacterPreset[];
}
