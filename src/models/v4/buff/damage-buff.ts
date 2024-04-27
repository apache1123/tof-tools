import type { AttackType } from '../../../constants/attack-type';
import type { DamageCategory } from '../../../constants/damage-category';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { WeaponName } from '../../../constants/weapon-definitions';
import type { AttackId } from '../attack/attack-definition';

export interface DamageBuff {
  value: number;
  /** The elemental types the damage buff applies to */
  elementalTypes: WeaponElementalType[];
  /** Damage buffs in the same category are additive. If they are not, they are multiplicative */
  damageCategory: DamageCategory;

  /** Damage buff only applies to certain actions */
  appliesTo?: {
    /** Damage buff only applies to attacks of this weapon */
    weapon?: WeaponName;
    /** Damage buff only applies to attacks of this attack type */
    attackType?: AttackType;
    /** Damage buff only applies to these attacks */
    attacks?: AttackId[];
  };
}
