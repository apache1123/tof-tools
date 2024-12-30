import { useSnapshot } from "valtio";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import type { Matrix } from "../../models/matrix/matrix";

/** Returns all matrices for the character */
export function useMatrices(characterId: CharacterId) {
  return useSnapshot(db.get("matrices")).filter(
    (matrix) => matrix.characterId === characterId,
  ) as Matrix[];
}
