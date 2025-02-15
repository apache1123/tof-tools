import type {
  DischargeAttackDefinition,
  DodgeAttackDefinition,
  NormalAttackDefinition,
  SkillAttackDefinition,
} from "../../../models/weapon/weapon-attack-definition";
import type { WeaponBuffDefinition } from "../../../models/weapon/weapon-buff-definition";
import type { WeaponResourceDefinition } from "../../../models/weapon/weapon-resource-definition";
import type {
  WeaponAttackPercentBuffDefinition,
  WeaponCritDamageBuffDefinition,
  WeaponCritRateBuffDefinition,
} from "../../../models/weapon-buff-definition";
import type {
  FusionWeaponElementalType,
  GearResonanceElements,
  WeaponElementalType,
} from "../../elemental-type";
import type { WeaponDefinitionId } from "../../weapons/weapon-definitions";
import type { WeaponType } from "../../weapons/weapon-type";

export interface WeaponDefinition {
  id: WeaponDefinitionId;
  /** This is the name of the simulacrum the weapon is related to, as the weapon is usually referred to by the simulacrum name instead of the actual name of the weapon */
  simulacrumDisplayName: string;
  /** The actual name of the weapon, e.g. Shadoweave for Lin */
  weaponDisplayName: string;
  /** Optional. The weapon's icon will be inferred from the id if not provided. This is used when the weapon has a different id than the icon name, e.g. id="Nola (Altered)", id="Nola (Frost)", etc. all use "Nola" icon */
  iconWeaponId?: WeaponDefinitionId;
  /** For displaying the weapon's elemental type icon */
  elementalIcon: FusionWeaponElementalType;
  /** The elemental type the weapon is considered to be for the purposes of elemental resonance, matrix effects etc. (not the damage dealing elemental type)
   * E.g. For Yan Miao, her weapon is considered to be both Physical and Flame to trigger Physical resonance and Flame resonance, but deals (mainly) physical damage.
   */
  resonanceElements: WeaponElementalType[];
  /** When calculating this weapon's damage, use the highest value out of these elements for gear base ATK, gear ATK%, gear element DMG% respectively - e.g. "Volt-Frost Fusion"/"Fusion of Mass and Flame".
   *
   * **For gear stats only. Does not apply to buffs etc.** */
  gearResonanceElements: GearResonanceElements;
  /** The default element the weapon deals damage in when it is on field */
  damageElement: WeaponElementalType;
  type: WeaponType;
  // TODO: Remove below after v4 transition
  /** @deprecated */
  attackPercentBuffs: WeaponAttackPercentBuffDefinition[];
  /** @deprecated */
  critRateBuffs: WeaponCritRateBuffDefinition[];
  /** @deprecated */
  critDamageBuffs: WeaponCritDamageBuffDefinition[];

  /** v4 below */

  normalAttacks: NormalAttackDefinition[];
  dodgeAttacks: DodgeAttackDefinition[];
  skills: SkillAttackDefinition[];
  discharges: DischargeAttackDefinition[];

  buffs: WeaponBuffDefinition[];

  resources: WeaponResourceDefinition[];
}
