import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponName, WeaponType } from '../constants/weapon-definitions';
import { weaponDefinitions } from '../constants/weapon-definitions';
import type {
  DischargeAttackDefinition,
  DodgeAttackDefinition,
  NormalAttackDefinition,
  SkillAttackDefinition,
} from './v4/attack/attack-definition';
import type { BuffDefinition } from './v4/buff/buff-definition';
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
  resonanceElements: WeaponElementalType[];
  /** When calculating this weapon's damage, use the highest value out of these elements for base ATK, ATK%, DMG% respectively - e.g. "Volt-Frost Fusion"/"Fusion of Mass and Flame" */
  calculationElements: WeaponElementalType[];
  /** The default element the weapon deals damage in when it is on field */
  damageElement: WeaponElementalType;
  type: WeaponType;
  attackPercentBuffs: WeaponAttackPercentBuffDefinition[];
  critRateBuffs: WeaponCritRateBuffDefinition[];

  /** v4 below */

  normalAttacks: NormalAttackDefinition[];
  dodgeAttacks: DodgeAttackDefinition[];
  skills: SkillAttackDefinition[];
  discharge: DischargeAttackDefinition;
  // TODO:
  triggeredAttacks: unknown[];

  buffs: BuffDefinition[];
}

export function getWeaponDefinition(id: WeaponName): WeaponDefinition {
  return weaponDefinitions.byId[id];
}
