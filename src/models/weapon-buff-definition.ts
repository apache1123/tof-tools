import type { ElementalResonance } from './elemental-resonance';
import type { WeaponElementalType } from './elemental-type';
import type { WeaponResonance } from './weapon-resonance';

export interface WeaponBuffDefinition {
  id: string;
  displayName: string;
  description: string;
  value: number;
  canStack: boolean;
  isActivePassively: boolean; // always active and is included in the relevant stat in the character sheet naturally
  minStarRequirement: number;
  maxStarRequirement: number;
  elementalResonanceRequirements?: ElementalResonance[]; // "OR" requirements
  weaponResonanceRequirements?: WeaponResonance[]; // "OR" requirements
}

export interface WeaponAttackPercentBuffDefinition
  extends WeaponBuffDefinition {
  elementalTypes: WeaponElementalType[];
}

export type WeaponCritRateBuffDefinition = WeaponBuffDefinition;
