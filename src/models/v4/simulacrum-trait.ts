import type { SimulacrumName } from '../../constants/simulacrum-traits';
import type {
  SimulacrumTraitConditionalAttackBuffDefinition,
  SimulacrumTraitPassiveAttackBuffDefinition,
} from './simulacrum-trait-attack-buff-definition';
import type {
  SimulacrumTraitConditionalDamageBuffDefinition,
  SimulacrumTraitPassiveDamageBuffDefinition,
} from './simulacrum-trait-damage-buff-definition';
import type {
  SimulacrumTraitConditionalMiscBuffDefinition,
  SimulacrumTraitPassiveMiscBuffDefinition,
} from './simulacrum-trait-misc-buff-definition';

export interface SimulacrumTrait {
  id: SimulacrumName;
  displayName: string;
  passiveDamageBuffs: SimulacrumTraitPassiveDamageBuffDefinition[];
  conditionalDamageBuffs: SimulacrumTraitConditionalDamageBuffDefinition[];
  passiveAttackBuffs: SimulacrumTraitPassiveAttackBuffDefinition[];
  conditionalAttackBuffs: SimulacrumTraitConditionalAttackBuffDefinition[];
  passiveMiscellaneousBuffs: SimulacrumTraitPassiveMiscBuffDefinition[];
  conditionalMiscellaneousBuffs: SimulacrumTraitConditionalMiscBuffDefinition[];
  remarks?: string;
}
