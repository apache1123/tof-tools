import type {
  FusionWeaponElementalType,
  WeaponElementalType,
} from '../constants/elemental-type';
import type { WeaponName } from '../constants/weapons/weapon-definitions';
import { weaponDefinitions } from '../constants/weapons/weapon-definitions';
import type { WeaponType } from '../constants/weapons/weapon-type';
import type {
  DischargeAttackDefinition,
  DodgeAttackDefinition,
  NormalAttackDefinition,
  SkillAttackDefinition,
  WeaponAttackDefinition,
} from './v4/weapon/weapon-attack-definition';
import type { WeaponBuffDefinition } from './v4/weapon/weapon-buff-definition';
import type { WeaponResourceDefinition } from './v4/weapon/weapon-resource-definition';
import type {
  WeaponAttackPercentBuffDefinition,
  WeaponCritDamageBuffDefinition,
  WeaponCritRateBuffDefinition,
} from './weapon-buff-definition';

export interface WeaponDefinition {
  id: WeaponName;
  displayName: string;
  /** Optional. The weapon's icon will be inferred from the id if not provided */
  iconWeaponName?: WeaponName;
  /** Optional. For displaying the weapon's elemental type icon */
  elementalIcon?: FusionWeaponElementalType;
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
  critDamageBuffs: WeaponCritDamageBuffDefinition[];

  /** v4 below */

  normalAttacks: NormalAttackDefinition[];
  dodgeAttacks: DodgeAttackDefinition[];
  skills: SkillAttackDefinition[];
  discharges: DischargeAttackDefinition[];
  passiveAttacks: WeaponAttackDefinition[];

  buffs: WeaponBuffDefinition[];

  resources: WeaponResourceDefinition[];
}

export function getWeaponDefinition(id: WeaponName): WeaponDefinition {
  return weaponDefinitions.byId[id];
}
