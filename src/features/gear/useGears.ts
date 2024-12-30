import { useSnapshot } from "valtio";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import type { Gear } from "../../models/gear/gear";

/** Returns all gears for the character */
export function useGears(characterId: CharacterId) {
  return useSnapshot(db.get("gears")).filter(
    (gear) => gear.characterId === characterId,
  ) as Gear[];
}
