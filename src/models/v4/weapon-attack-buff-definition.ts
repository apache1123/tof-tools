import type { CommonWeaponAttackBuffId } from '../../constants/common-weapon-attack-buffs';
import type { WeaponElementalType } from '../../constants/elemental-type';
import type { WeaponName } from '../../constants/weapon-definitions';

export interface WeaponAttackBuffDefinition {
  id: string;
  displayName: string;
  description: string;

  value: number;
  elementalTypes: WeaponElementalType[];
  maxStacks: number;

  /** "OR" requirements */
  elementalWeaponRequirements?: {
    weaponElementalType: WeaponElementalType;
    minNumOfWeapons: number;
  }[];
}

export interface CommonWeaponAttackBuffDefinition
  extends WeaponAttackBuffDefinition {
  id: CommonWeaponAttackBuffId;

  triggeredBy?: 'combat-start'[];
  // {
  //   weaponActions: {
  //     weaponName: WeaponName;
  //     action: 'combat-start';
  //   }[];
  // };
  endedBy?: 'combat-end'[];
}
