import type { AttackBuff } from "../../../definitions/types/buff/attack-buff";
import type { BuffAbility } from "../../../definitions/types/buff/buff-ability";
import type { CritDamageBuff } from "../../../definitions/types/buff/crit-damage-buff";
import type { StarRequirement } from "../star-requirement";

// TODO:
export interface MatrixBuffDefinition extends BuffAbility {
  /** For convenience when defining the definition. The actual applicable attack buffs should be filtered out depending on the star of the matrix */
  attackBuffsWithStarRequirement?: (AttackBuff & StarRequirement)[];
  /** For convenience when defining the definition. The actual applicable crit damage buffs should be filtered out depending on the star of the matrix */
  critDamageBuffsWithStarRequirement?: (CritDamageBuff & StarRequirement)[];
}
