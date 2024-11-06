import type {
  DischargeAttackDefinition,
  DodgeAttackDefinition,
  NormalAttackDefinition,
  SkillAttackDefinition,
} from "../../../models/v4/weapon/weapon-attack-definition";
import type { WeaponBuffDefinition } from "../../../models/v4/weapon/weapon-buff-definition";
import type { WeaponResourceDefinition } from "../../../models/v4/weapon/weapon-resource-definition";
import type {
  WeaponAttackPercentBuffDefinition,
  WeaponCritDamageBuffDefinition,
  WeaponCritRateBuffDefinition,
} from "../../../models/weapon-buff-definition";
import type {
  FusionWeaponElementalType,
  WeaponElementalType,
} from "../../elemental-type";
import type { WeaponName } from "../../weapons/weapon-definitions";
import { weaponDefinitions } from "../../weapons/weapon-definitions";
import type { WeaponType } from "../../weapons/weapon-type";

export interface Weapon {
  id: WeaponName;
  displayName: string;
  /** Optional. The weapon's icon will be inferred from the id if not provided */
  iconWeaponName?: WeaponName;
  /** For displaying the weapon's elemental type icon */
  elementalIcon: FusionWeaponElementalType;
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

  buffs: WeaponBuffDefinition[];

  resources: WeaponResourceDefinition[];
}

export function getWeaponDefinition(id: WeaponName): Weapon {
  return weaponDefinitions.byId[id];
}
