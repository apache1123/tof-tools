import {
  type MatrixSetBaseName,
  matrixSetDefinitionsLookup,
} from '../definitions/matrix-set-definitions';
import type {
  MatrixSetAttackPercentBuffDefinition,
  MatrixSetCritDamageBuffDefinition,
  MatrixSetCritRateBuffDefinition,
} from './matrix-set-buff-definition';
import type { MatrixBuffDefinition } from './v4/matrix/matrix-buff-definition';

export type MatrixSetPieces = 2 | 4;
export const matrixSet2pcIdSuffix = '2pc';
export const matrixSet4pcIdSuffix = '4pc';

export type MatrixSet2pcName =
  `${MatrixSetBaseName} ${typeof matrixSet2pcIdSuffix}`;
export type MatrixSet4pcName =
  `${MatrixSetBaseName} ${typeof matrixSet4pcIdSuffix}`;
export type MatrixSetName = MatrixSet2pcName | MatrixSet4pcName;

export interface MatrixSetDefinition {
  id: MatrixSetName;
  displayName: string;
  pieces: MatrixSetPieces;
  attackPercentBuffs: MatrixSetAttackPercentBuffDefinition[];
  critRateBuffs: MatrixSetCritRateBuffDefinition[];
  critDamageBuffs: MatrixSetCritDamageBuffDefinition[];

  // v4 below
  buffs: MatrixBuffDefinition[];
}

export function getMatrixSetDefinition(
  matrixSetName: MatrixSetName
): MatrixSetDefinition {
  return matrixSetDefinitionsLookup[matrixSetName];
}

export function getMatrixSet2pcTo4pcName(
  matrixSet2pcName: MatrixSet2pcName
): MatrixSet4pcName {
  return matrixSet2pcName.replace(
    matrixSet2pcIdSuffix,
    matrixSet4pcIdSuffix
  ) as MatrixSet4pcName;
}
export function getMatrixSet4pcTo2pcName(
  matrixSet4pcName: MatrixSet4pcName
): MatrixSet2pcName {
  return matrixSet4pcName.replace(
    matrixSet4pcIdSuffix,
    matrixSet2pcIdSuffix
  ) as MatrixSet2pcName;
}
