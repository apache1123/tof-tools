import type { CommonWeaponPassiveAttackBuffId } from '../constants/common-weapon-attack-buffs';
import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponName, WeaponType } from '../constants/weapon-definitions';
import { weaponDefinitions } from '../constants/weapon-definitions';
import type {
  NormalAttackDefinition,
  SkillAttackDefinition,
} from './v4/attack-definition';
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

  /** v4 below */
  normalAttacks: NormalAttackDefinition[];
  skills: SkillAttackDefinition[];

  commonPassiveAttackBuffs: CommonWeaponPassiveAttackBuffId[];
  // TODO: weapon specific attack buffs
}

export function getWeaponDefinition(id: WeaponName): WeaponDefinition {
  return weaponDefinitions.byId[id];
}
