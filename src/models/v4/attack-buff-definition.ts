import type { WeaponElementalType } from '../../constants/elemental-type';
import type { WeaponResonance } from '../../constants/weapon-resonance';

export interface AttackBuffDefinition {
  id: string;
  displayName: string;
  description: string;

  value: number;
  elementalTypes: WeaponElementalType[];
  maxStacks: number;

  duration?: number;
  cooldown?: number;

  /** Assumptions, compromises made etc. */
  remarks?: string;

  /** "OR" requirements */
  elementalWeaponRequirements?: {
    weaponElementalType: WeaponElementalType;
    minNumOfWeapons: number;
  }[];
  /** "OR" requirements */
  weaponResonanceRequirements?: WeaponResonance[];
}
