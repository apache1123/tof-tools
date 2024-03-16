import type { SimulacrumName } from '../../constants/simulacrum-traits';
import type { AttackBuffDefinition } from './buffs/attack-buff-definition';
import type { DamageBuffDefinition } from './buffs/damage-buff-definition';
import type { MiscellaneousBuffDefinition } from './buffs/miscellaneous-buff-definition';

export interface SimulacrumTrait {
  id: SimulacrumName;
  displayName: string;
  attackBuffs: AttackBuffDefinition[];
  damageBuffs: DamageBuffDefinition[];
  miscellaneousBuffs: MiscellaneousBuffDefinition[];

  remarks?: string;
}
