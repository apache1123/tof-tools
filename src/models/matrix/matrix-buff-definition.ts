import type { AttackPercentBuffDefinition } from "../../definitions/types/buff/attack-percent-buff-definition";
import type { BuffAbilityDefinition } from "../../definitions/types/buff/buff-ability-definition";
import type { CritDamageBuffDefinition } from "../../definitions/types/buff/crit-damage-buff-definition";
import type { StarRequirement } from "../star-requirement";

// TODO:
export interface MatrixBuffDefinition extends BuffAbilityDefinition {
  /** For convenience when defining the definition. The actual applicable attack buffs should be filtered out depending on the star of the matrix */
  attackBuffsWithStarRequirement?: (AttackPercentBuffDefinition &
    StarRequirement)[];
  /** For convenience when defining the definition. The actual applicable crit damage buffs should be filtered out depending on the star of the matrix */
  critDamageBuffsWithStarRequirement?: (CritDamageBuffDefinition &
    StarRequirement)[];
}
