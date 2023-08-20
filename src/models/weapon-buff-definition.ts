import type { ElementalResonance } from './elemental-resonance';
import type { WeaponElementalType } from './elemental-type';
import type { WeaponResonance } from './weapon-resonance';

export interface WeaponBuffDefinition {
  displayName: string;
  description: string;
  value: number;
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
