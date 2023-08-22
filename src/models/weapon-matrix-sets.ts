import { type MatrixSet, newMatrixSet, setStars } from './matrix-set';
import type {
  MatrixSet4pcName} from './matrix-set-definition';
import {
  getMatrixSet4pcTo2pcName,
  getMatrixSetDefinition
} from './matrix-set-definition';

export interface WeaponMatrixSets {
  matrixSet4pc: MatrixSet | undefined;
  matrixSet2pc1: MatrixSet | undefined;
  matrixSet2pc2: MatrixSet | undefined;
}

export function emptyWeaponMatrixSets(): WeaponMatrixSets {
  return {
    matrixSet4pc: undefined,
    matrixSet2pc1: undefined,
    matrixSet2pc2: undefined,
  };
}

export function getMatrixSets(weaponMatrixSets: WeaponMatrixSets): MatrixSet[] {
  const { matrixSet4pc, matrixSet2pc1, matrixSet2pc2 } = weaponMatrixSets;
  if (matrixSet4pc) {
    const counterpartMatrixSet2pcName = getMatrixSet4pcTo2pcName(
      matrixSet4pc.definitionId as MatrixSet4pcName
    );

    const counterpartMatrixSet2pc = newMatrixSet(
      getMatrixSetDefinition(counterpartMatrixSet2pcName)
    );
    setStars(counterpartMatrixSet2pc, matrixSet4pc.stars);

    return [matrixSet4pc, counterpartMatrixSet2pc];
  } else if (matrixSet2pc1 || matrixSet2pc2) {
    return [matrixSet2pc1, matrixSet2pc2].filter((x) => x) as MatrixSet[];
  } else {
    return [];
  }
}
export function setMatrixSet4pc(
  weaponMatrixSets: WeaponMatrixSets,
  matrixSet: MatrixSet
): void {
  weaponMatrixSets.matrixSet4pc = matrixSet;
  clearMatrixSet2pc1(weaponMatrixSets);
  clearMatrixSet2pc2(weaponMatrixSets);
}
export function setMatrixSet2pc1(
  weaponMatrixSets: WeaponMatrixSets,
  matrixSet: MatrixSet
): void {
  weaponMatrixSets.matrixSet2pc1 = matrixSet;
  clearMatrixSet4pc(weaponMatrixSets);
}
export function setMatrixSet2pc2(
  weaponMatrixSets: WeaponMatrixSets,
  matrixSet: MatrixSet
): void {
  weaponMatrixSets.matrixSet2pc2 = matrixSet;
  clearMatrixSet4pc(weaponMatrixSets);
}

export function clearMatrixSet4pc(weaponMatrixSets: WeaponMatrixSets): void {
  weaponMatrixSets.matrixSet4pc = undefined;
}
export function clearMatrixSet2pc1(weaponMatrixSets: WeaponMatrixSets): void {
  weaponMatrixSets.matrixSet2pc1 = undefined;
}
export function clearMatrixSet2pc2(weaponMatrixSets: WeaponMatrixSets): void {
  weaponMatrixSets.matrixSet2pc2 = undefined;
}
