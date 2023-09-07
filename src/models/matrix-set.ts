import type { MatrixSetName } from './matrix-set-definition';
import {
  getMatrixSetDefinition,
  type MatrixSetDefinition,
} from './matrix-set-definition';

export interface MatrixSet {
  definitionId: MatrixSetName;
  stars: number;
}

export function newMatrixSet(definition: MatrixSetDefinition): MatrixSet {
  const matrixSet = {} as MatrixSet;
  setDefinition(matrixSet, definition);
  setStars(matrixSet, 0);
  return matrixSet;
}

export function getDefinition(matrixSet: MatrixSet): MatrixSetDefinition {
  const { definitionId } = matrixSet;
  return getMatrixSetDefinition(definitionId);
}
export function setDefinition(
  matrixSet: MatrixSet,
  definition: MatrixSetDefinition
): void {
  const { id } = definition;
  matrixSet.definitionId = id;
}

export function setStars(matrix: MatrixSet, stars: number): void {
  matrix.stars = stars;
}
