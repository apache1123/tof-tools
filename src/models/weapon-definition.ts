import type { ElementalResonance } from './elemental-resonance';
import type { ElementalType, WeaponElementalType } from './elemental-type';
import type { WeaponResonance } from './weapon-resonance';

export interface WeaponDefinition {
  id: string;
  displayName: string;
  elementalType: WeaponElementalType;
  type: WeaponType;
  attackPercentBuffs: WeaponAttackPercentBuff[]; // "OR" requirements
  critRateBuffs: WeaponCritRateBuff[]; // "OR" requirements
}

export enum WeaponType {
  DPS = 'DPS',
  Support = 'Support',
  Defense = 'Defense',
}

export interface WeaponBuff {
  displayName: string;
  description: string;
  value: number;
  minStarRequirement: number;
  maxStarRequirement: number;
  elementalResonanceRequirements?: ElementalResonance[];
  weaponResonanceRequirements?: WeaponResonance[];
}

export interface WeaponAttackPercentBuff extends WeaponBuff {
  elementalTypes: WeaponElementalType[] 
}

export type WeaponCritRateBuff = WeaponBuff;
