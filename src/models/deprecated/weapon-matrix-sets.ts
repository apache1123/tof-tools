import type { Dto } from "../../db/repository/dto";
import type { MatrixSetDto } from "./matrix-set";

/** @deprecated Removed in v4 */
export interface WeaponMatrixSetsDto extends Dto {
  matrixSet4pc: MatrixSetDto | undefined;
  matrixSet2pc1: MatrixSetDto | undefined;
  matrixSet2pc2: MatrixSetDto | undefined;
  version: 1;
}
