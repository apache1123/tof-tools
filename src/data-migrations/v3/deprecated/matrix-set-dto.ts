import type { Dto } from "../../../db/repository/dto";
import type { MatrixSetName } from "./matrix-set-definition";

/** @deprecated Removed in v4 */
export interface MatrixSetDtoV3 extends Dto {
  definitionId: MatrixSetName;
  stars: number;
  version: 1;
}
