import type { WeaponElementalType } from './elemental-type';

export interface MatrixDefinition {
  id: string;
  displayName: string;
  pieces: 2 | 4;
  attackPercentBuffs: MatrixAttackPercentBuff[];
  critRateBuffs: MatrixCritRateBuff[];
  critDamageBuffs: MatrixCritDamageBuff[];
}

export interface MatrixBuff {
  description: string;
  starValues: [
    { star: 0; value: number },
    { star: 1; value: number },
    { star: 2; value: number },
    { star: 3; value: number }
  ];
  isActivePassively: boolean; // always active and is included in the relevant stat in the character sheet naturally
  elementalWeaponsRequirements?: {
    weaponElementalType: WeaponElementalType;
    minNumOfWeapons: 1 | 2 | 3;
  }[]; // "OR" requirements;
}

export interface MatrixAttackPercentBuff extends MatrixBuff {
  elementalTypes: WeaponElementalType[];
}

export type MatrixCritRateBuff = MatrixBuff;
export type MatrixCritDamageBuff = MatrixBuff;
