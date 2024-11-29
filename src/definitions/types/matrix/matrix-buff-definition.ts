import type { StarRequirement } from "../../../models/star-requirement";
import type { BuffAbilityDefinition } from "../buff/buff-ability-definition";

export interface MatrixBuffDefinition extends BuffAbilityDefinition {
  starRequirement: StarRequirement;
  /** The minimum amount of pieces required to activate this buff, e.g. 2 or 4 pieces */
  minMatrixPieces: number;
}
