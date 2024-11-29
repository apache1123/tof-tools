import type { ElementalResonance } from "../definitions/elemental-resonance";
import type { WeaponElementalType } from "../definitions/elemental-type";
import type { WeaponResonance } from "../definitions/weapons/weapon-resonance";

// TODO: Remove below after v4 transition
/** @deprecated */
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

/** @deprecated */
export interface WeaponAttackPercentBuffDefinition
  extends WeaponBuffDefinition {
  elementalTypes: WeaponElementalType[];
}

/** @deprecated */
export type WeaponCritRateBuffDefinition = WeaponBuffDefinition;
/** @deprecated */
export type WeaponCritDamageBuffDefinition = WeaponBuffDefinition;
