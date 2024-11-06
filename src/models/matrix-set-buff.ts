import type {
  MatrixSetAttackPercentBuffDefinition,
  MatrixSetBuffDefinition,
} from "./matrix-set-buff-definition";
import type {
  MatrixSet2pcName,
  MatrixSet4pcName,
} from "./matrix-set-definition";

export interface MatrixSetBuff
  extends Pick<MatrixSetBuffDefinition, "description" | "isActivePassively"> {
  value: number;
  stars: number;
  matrixSetId: MatrixSet2pcName | MatrixSet4pcName;
  matrixSetDisplayName: string;
}

export interface MatrixSetAttackPercentBuff
  extends MatrixSetBuff,
    Pick<MatrixSetAttackPercentBuffDefinition, "elementalTypes"> {}

export type MatrixSetCritRateBuff = MatrixSetBuff;
export type MatrixSetCritDamageBuff = MatrixSetBuff;
