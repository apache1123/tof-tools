import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponName, WeaponType } from '../constants/weapon-definitions';
import { weaponDefinitions } from '../constants/weapon-definitions';
import type { AttackDefinition } from './attack-definition';
import type {
  WeaponAttackPercentBuffDefinition,
  WeaponCritRateBuffDefinition,
} from './weapon-buff-definition';

export interface WeaponDefinition {
  id: WeaponName;
  displayName: string;
  /** The elemental type the weapon is considered to be for the purposes of elemental resonance, matrix effects etc. (not the damage dealing elemental type)
   * E.g. For Yan Miao, her weapon is considered to be both Physical and Flame to trigger Physical resonance and Flame resonance, but deals (mainly) physical damage.
   */
  elementalTypes: WeaponElementalType[];
  type: WeaponType;
  attackPercentBuffs: WeaponAttackPercentBuffDefinition[];
  critRateBuffs: WeaponCritRateBuffDefinition[];
  attacks: AttackDefinition[];
}

export function getWeaponDefinition(id: WeaponName): WeaponDefinition {
  return weaponDefinitions.byId[id];
}
