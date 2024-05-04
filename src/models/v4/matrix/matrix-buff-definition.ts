import type { AttackBuff } from '../buff/attack-buff';
import type { BuffDefinition } from '../buff/buff-definition';
import { CritDamageBuff } from '../buff/crit-damage-buff';
import type { DamageBuff } from '../buff/damage-buff';
import type { StarRequirement } from '../star-requirement';

export interface MatrixBuffDefinition extends BuffDefinition {
  /** For convenience when defining the definition. The actual applicable attack buffs should be filtered out depending on the star of the matrix */
  attackBuffsWithStarRequirement?: (AttackBuff & StarRequirement)[];
  /** For convenience when defining the definition. The actual applicable damage buffs should be filtered out depending on the star of the matrix */
  damageBuffsWithStarRequirement?: (DamageBuff & StarRequirement)[];
  /** For convenience when defining the definition. The actual applicable crit damage buffs should be filtered out depending on the star of the matrix */
  critDamageBuffsWithStarRequirement?: (CritDamageBuff & StarRequirement)[];
}
