import type { WeaponElementalType } from '../../constants/elemental-type';
import type { WeaponName } from '../../constants/weapon-definitions';
import type { MiscellaneousBuffDefinition } from './miscellaneous-buff-definition';

export interface SimulacrumTraitPassiveMiscBuffDefinition
  extends MiscellaneousBuffDefinition {
  increaseElementalBaseAttackToMatchHighest?: WeaponElementalType;
  allAttackBuff?: {
    forWeapon: WeaponName;
    value: number;
  };
}

export interface SimulacrumTraitConditionalMiscBuffDefinition
  extends MiscellaneousBuffDefinition {
  normalAttackBuff?: {
    forWeapon: WeaponName;
    value: number;
  };

  triggeredByActiveWeapon?: WeaponName;

  elementalWeaponRequirement?: {
    weaponElementalType: WeaponElementalType;
    numOfWeapons: number;
  };
}
