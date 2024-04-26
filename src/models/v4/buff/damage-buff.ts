import type { DamageCategory } from '../../../constants/damage-category';
import type { WeaponElementalType } from '../../../constants/elemental-type';

export interface DamageBuff {
  value: number;
  /** The elemental types the damage buff applies to */
  elementalTypes: WeaponElementalType[];
  /** Damage buffs in the same category are additive. If they are not, they are multiplicative */
  damageCategory: DamageCategory;
}
