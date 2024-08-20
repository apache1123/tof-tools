import type { ElementalResonance } from '../constants/elemental-resonance';
import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponResonance } from '../constants/weapons/weapon-resonance';

export interface WeaponBuffDefinition {
  id: string;
  displayName: string;
  description: string;
  value: number;
  canStack: boolean;
  /** always active and is included in the relevant stat in the character sheet naturally. The opposite of this is "conditional" buff */
  isActivePassively: boolean;
  minStarRequirement: number;
  maxStarRequirement: number;
  /** "OR" requirements */
  elementalResonanceRequirements?: ElementalResonance[];
  /** "OR" requirements */
  weaponResonanceRequirements?: WeaponResonance[];
  /** "OR" requirements */
  elementalWeaponsRequirements?: {
    weaponElementalType: WeaponElementalType;
    minNumOfWeapons: 1 | 2 | 3;
    maxNumOfWeapons: 1 | 2 | 3;
  }[];
}

export interface WeaponAttackPercentBuffDefinition
  extends WeaponBuffDefinition {
  elementalTypes: WeaponElementalType[];
}

export type WeaponCritRateBuffDefinition = WeaponBuffDefinition;
export type WeaponCritDamageBuffDefinition = WeaponBuffDefinition;
