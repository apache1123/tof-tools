import type { WeaponElementalType } from '../../constants/elemental-type';
import type { WeaponResonance } from '../../constants/weapon-resonance';

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
  /** "OR" requirements */
  weaponResonanceRequirements?: WeaponResonance[];
}
