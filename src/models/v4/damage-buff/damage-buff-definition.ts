import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { EffectDefinition } from '../effect/effect-definition';

export interface DamageBuffDefinition extends EffectDefinition {
  value: number;
  /** The elemental types the damage buff applies to */
  elementalTypes: WeaponElementalType[];
  /** Damage buffs in the same category are additive. If they are not, they are multiplicative */
  damageCategory:
    | 'Relic passive'
    | 'Enemy debuff'
    | 'DMG buff category 1'
    | 'DMG buff category 2'
    | '[TEMP_TRAIT]'
    | '[TEMP_UNKNOWN]';
}
