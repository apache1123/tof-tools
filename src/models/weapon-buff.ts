import type { WeaponName } from '../constants/weapon-definitions';
import type {
  WeaponAttackPercentBuffDefinition,
  WeaponBuffDefinition,
} from './weapon-buff-definition';

export interface WeaponBuff
  extends Pick<WeaponBuffDefinition, 'displayName' | 'description' | 'value'> {
  weaponId: WeaponName;
  weaponDisplayName: string;
}

export interface WeaponAttackPercentBuff
  extends WeaponBuff,
    Pick<WeaponAttackPercentBuffDefinition, 'elementalTypes'> {}

export type WeaponCritRateBuff = WeaponBuff;
