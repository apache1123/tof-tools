import type { WeaponName } from '../constants/weapon-definitions';
import type { WeaponElementalType } from './elemental-type';
import type {
  WeaponAttackPercentBuffDefinition,
  WeaponCritRateBuffDefinition,
} from './weapon-buff-definition';

export interface WeaponDefinition {
  id: WeaponName;
  displayName: string;
  elementalType: WeaponElementalType;
  type: WeaponType;
  attackPercentBuffs: WeaponAttackPercentBuffDefinition[];
  critRateBuffs: WeaponCritRateBuffDefinition[];
}

export enum WeaponType {
  DPS = 'DPS',
  Support = 'Support',
  Defense = 'Defense',
}
