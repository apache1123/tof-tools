import { useSnapshot } from "valtio";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import type { Matrix } from "../../models/matrix/matrix";

/** Returns all matrices for the selected character */
export function useMatrices(selectedCharacterId: CharacterId | undefined) {
  const matrixRepoProxy = db.get("matrices");
  const matrixRepoSnap = useSnapshot(matrixRepoProxy);

  const matricesProxy = matrixRepoProxy.filter(filterByCharacter);
  const matricesSnap = matrixRepoSnap.filter(filterByCharacter);

  return {
    matricesProxy,
    matricesSnap,
  };

  function filterByCharacter(matrix: Matrix) {
    return matrix.characterId === selectedCharacterId;
  }
}
