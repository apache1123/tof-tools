import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponName } from '../constants/weapons/weapon-definitions';
import type { WeaponResonance } from '../constants/weapons/weapon-resonance';

export interface MatrixSetBuffDefinition {
  description: string;
  starValues: [
    { star: 0; value: number },
    { star: 1; value: number },
    { star: 2; value: number },
    { star: 3; value: number }
  ];
  canStack: boolean;
  /** always active and is included in the relevant stat in the character sheet naturally. The opposite of this is "conditional" buff */
  isActivePassively: boolean;
  /** "OR" requirements */
  weaponResonanceRequirements?: WeaponResonance[];
  /** "OR" requirements */
  elementalWeaponsRequirements?: {
    weaponElementalType: WeaponElementalType;
    minNumOfWeapons: 1 | 2 | 3;
  }[];
  weaponRequirement?: WeaponName;
}

export interface MatrixSetAttackPercentBuffDefinition
  extends MatrixSetBuffDefinition {
  elementalTypes: WeaponElementalType[];
}

export type MatrixSetCritRateBuffDefinition = MatrixSetBuffDefinition;
export type MatrixSetCritDamageBuffDefinition = MatrixSetBuffDefinition;
