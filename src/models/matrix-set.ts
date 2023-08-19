import {
  matrixSet2pcDefinitions,
  matrixSet4pcDefinitions,
} from '../constants/matrix-set-definitions';
import type {
  MatrixSet2pcName,
  MatrixSet4pcName,
  MatrixSetDefinition,
} from './matrix-set-definition';

export interface MatrixSet {
  definitionId: MatrixSet2pcName | MatrixSet4pcName;
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
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    matrixSet4pcDefinitions.byId[definitionId] ??
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    matrixSet2pcDefinitions.byId[definitionId]
  );
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
