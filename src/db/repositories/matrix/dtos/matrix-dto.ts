import type { MatrixDefinitionId } from "../../../../definitions/matrices/matrix-definitions";
import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import type { Dto } from "../../../repository/dto";

export interface MatrixDto extends Dto {
  id: string;
  characterId: string;
  typeId: MatrixTypeId;
  definitionId: MatrixDefinitionId;
  stars: number;
  version: 1;
}
