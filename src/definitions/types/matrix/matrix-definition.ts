import type { MatrixName } from "../../matrices/matrix-definitions";
import type { MatrixBuffDefinition } from "./matrix-buff-definition";

export interface MatrixDefinition {
  id: MatrixName;
  displayName: string;
  buffs: MatrixBuffDefinition[];
}
