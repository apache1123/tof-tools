import type { WeaponElementalType } from '../../constants/elemental-type';

export interface AttackBuffDefinition {
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
