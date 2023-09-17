import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponName, WeaponType } from '../constants/weapon-definitions';
import { weaponDefinitions } from '../constants/weapon-definitions';
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

export function getWeaponDefinition(id: WeaponName): WeaponDefinition {
  return weaponDefinitions.byId[id];
}
