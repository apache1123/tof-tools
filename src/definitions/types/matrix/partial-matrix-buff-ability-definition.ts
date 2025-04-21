import type { Subtract } from "utility-types";

import type { PartialBuffAbilityDefinition } from "../buff/partial-buff-ability-definition";
import type { MatrixBuffAbilityDefinition } from "./matrix-buff-ability-definition";

export type PartialMatrixBuffAbilityDefinition = PartialBuffAbilityDefinition &
  Subtract<MatrixBuffAbilityDefinition, PartialBuffAbilityDefinition>;
