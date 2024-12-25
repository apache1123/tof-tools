import { useSnapshot } from "valtio";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import type { Matrix } from "../../models/matrix/matrix";

/** Returns all matrices for the selected character */
export function useMatrices(selectedCharacterId: CharacterId | undefined) {
  const matrixRepoProxy = db.get("matrices");
  const matrixRepoSnap = useSnapshot(matrixRepoProxy);

  const matrixProxies = matrixRepoProxy.filter(filterByCharacter);
  const matrixSnaps = matrixRepoSnap.filter(filterByCharacter);

  return {
    matrixProxies,
    matrixSnaps,
  };

  function filterByCharacter(matrix: Matrix) {
    return matrix.characterId === selectedCharacterId;
  }
}
