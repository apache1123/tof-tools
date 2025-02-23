import type { Dto } from "../../../db/repository/dto";
import type { MatrixSetDtoV3 } from "./matrix-set-dto";

/** @deprecated Removed in v4 */
export interface WeaponMatrixSetsDtoV3 extends Dto {
  matrixSet4pc: MatrixSetDtoV3 | undefined;
  matrixSet2pc1: MatrixSetDtoV3 | undefined;
  matrixSet2pc2: MatrixSetDtoV3 | undefined;
  version: 1;
}
