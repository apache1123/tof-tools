import type { MatrixSetName } from '../constants/matrix-set-definitions';
import type { WeaponElementalType } from './elemental-type';

export interface MatrixSetDefinition {
  id: MatrixSet2pcName | MatrixSet4pcName;
  displayName: string;
  pieces: MatrixSetPieces;
  attackPercentBuffs: MatrixSetAttackPercentBuff[];
  critRateBuffs: MatrixSetCritRateBuff[];
  critDamageBuffs: MatrixSetCritDamageBuff[];
}

export type MatrixSetPieces = 2 | 4;

export type MatrixSet2pcName = `${MatrixSetName} 2pc`;
export type MatrixSet4pcName = `${MatrixSetName} 4pc`;

export interface MatrixSetBuff {
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

export interface MatrixSetAttackPercentBuff extends MatrixSetBuff {
  elementalTypes: WeaponElementalType[];
}

export type MatrixSetCritRateBuff = MatrixSetBuff;
export type MatrixSetCritDamageBuff = MatrixSetBuff;
