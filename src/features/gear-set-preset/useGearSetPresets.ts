import { useSnapshot } from "valtio/index";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";

export function useGearSetPresets(characterId: CharacterId) {
  return useSnapshot(db.get("gearSetPresets")).filter((preset) => {
    return preset.characterId === characterId;
  });
}
