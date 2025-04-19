import type { MatrixDefinitionId } from "../../matrices/matrix-definitions";
import type { MatrixBuffAbilityDefinition } from "./matrix-buff-ability-definition";

export interface MatrixDefinition {
  id: MatrixDefinitionId;
  displayName: string;
  buffs: MatrixBuffAbilityDefinition[];
}
