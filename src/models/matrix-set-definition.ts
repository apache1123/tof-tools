import type { MatrixSetName } from '../constants/matrix-set-definitions';
import type { MatrixSetAttackPercentBuffDefinition, MatrixSetCritDamageBuffDefinition,MatrixSetCritRateBuffDefinition } from './matrix-set-buff-definition';

export interface MatrixSetDefinition {
  id: MatrixSet2pcName | MatrixSet4pcName;
  displayName: string;
  pieces: MatrixSetPieces;
  attackPercentBuffs: MatrixSetAttackPercentBuffDefinition[];
  critRateBuffs: MatrixSetCritRateBuffDefinition[];
  critDamageBuffs: MatrixSetCritDamageBuffDefinition[];
}

export type MatrixSetPieces = 2 | 4;

export type MatrixSet2pcName = `${MatrixSetName} 2pc`;
export type MatrixSet4pcName = `${MatrixSetName} 4pc`;

