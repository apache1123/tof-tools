import type { WeaponElementalType } from '../constants/elemental-type';

export interface MatrixSetBuffDefinition {
  description: string;
  // starValues: { star: 0 | 1 | 2 | 3; value: number }[];
  starValues: [
    { star: 0; value: number },
    { star: 1; value: number },
    { star: 2; value: number },
    { star: 3; value: number }
  ];
  canStack: boolean;
  isActivePassively: boolean; // always active and is included in the relevant stat in the character sheet naturally. The opposite of this is "conditional" buff
  elementalWeaponsRequirements?: {
    weaponElementalType: WeaponElementalType;
    minNumOfWeapons: 1 | 2 | 3;
  }[]; // "OR" requirements;
}

export interface MatrixSetAttackPercentBuffDefinition
  extends MatrixSetBuffDefinition {
  elementalTypes: WeaponElementalType[];
}

export type MatrixSetCritRateBuffDefinition = MatrixSetBuffDefinition;
export type MatrixSetCritDamageBuffDefinition = MatrixSetBuffDefinition;
