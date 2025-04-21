import type { Overwrite } from "utility-types";

import type { MatrixDefinition } from "./matrix-definition";
import type { PartialMatrixBuffAbilityDefinition } from "./partial-matrix-buff-ability-definition";

export type PartialMatrixDefinition = Overwrite<
  MatrixDefinition,
  {
    buffs: PartialMatrixBuffAbilityDefinition[];
  }
>;
