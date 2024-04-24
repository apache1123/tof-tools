import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { WeaponName } from '../../../constants/weapon-definitions';

export interface MiscellaneousBuff {
  // TODO: calculations for these buffs
  /** Buffs all normal attacks of weapon by value, e.g. value = 0.5 = +50% */
  normalAttackBuff?: {
    forWeapon: WeaponName;
    value: number;
  };
  /** Buffs all attacks of weapon by value. e.g. value = 0.5 = +50% */
  allAttackBuff?: {
    forWeapon: WeaponName;
    value: number;
  };
  /** Increase the base attack of the specified elemental type to match the highest base attack of all other elemental types (if it is higher) */
  increaseElementalBaseAttackToMatchHighest?: WeaponElementalType;
}
