import type { Overwrite } from "utility-types";

import type { SimulacrumTrait } from "../../../models/simulacrum-trait";
import type { PartialBuffAbilityDefinition } from "../buff/partial-buff-ability-definition";

export type PartialSimulacrumTrait = Overwrite<
  SimulacrumTrait,
  {
    buffs: PartialBuffAbilityDefinition[];
  }
>;
