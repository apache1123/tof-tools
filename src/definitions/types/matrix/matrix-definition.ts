import type { MatrixDefinitionId } from "../../matrices/matrix-definitions";
import type { MatrixBuffDefinition } from "./matrix-buff-definition";

export interface MatrixDefinition {
  id: MatrixDefinitionId;
  displayName: string;
  buffs: MatrixBuffDefinition[];
}
