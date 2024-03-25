import type { SimulacrumName } from '../../constants/simulacrum-traits';
import type { AttackBuffDefinition } from './attack-buff/attack-buff-definition';
import type { DamageBuffDefinition } from './damage-buff/damage-buff-definition';
import type { MiscellaneousBuffDefinition } from './miscellaneous-buff/miscellaneous-buff-definition';

export interface SimulacrumTrait {
  id: SimulacrumName;
  displayName: string;
  attackBuffs: AttackBuffDefinition[];
  damageBuffs: DamageBuffDefinition[];
  miscellaneousBuffs: MiscellaneousBuffDefinition[];

  remarks?: string;
}
