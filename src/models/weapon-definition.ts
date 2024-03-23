import type { CommonWeaponAttackBuffId } from '../constants/common-weapon-attack-buffs';
import type { CommonWeaponDamageBuffId } from '../constants/common-weapon-damage-buffs';
import type { WeaponElementalType } from '../constants/elemental-type';
import type { WeaponName, WeaponType } from '../constants/weapon-definitions';
import { weaponDefinitions } from '../constants/weapon-definitions';
import type {
  DischargeAttackDefinition,
  DodgeAttackDefinition,
  NormalAttackDefinition,
  SkillAttackDefinition,
} from './v4/attacks/attack-definition';
import type { AttackBuffDefinition } from './v4/buffs/attack-buff-definition';
import type { DamageBuffDefinition } from './v4/buffs/damage-buff-definition';
import type { EffectDefinition } from './v4/effects/effect-definition';
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
  /** The element the weapon deals damage in when it is on field */
  damageElement: WeaponElementalType;
  type: WeaponType;
  attackPercentBuffs: WeaponAttackPercentBuffDefinition[];
  critRateBuffs: WeaponCritRateBuffDefinition[];

  /** v4 below */

  normalAttacks: NormalAttackDefinition[];
  dodgeAttacks: DodgeAttackDefinition[];
  skills: SkillAttackDefinition[];
  discharge: DischargeAttackDefinition;

  effects: EffectDefinition[];

  commonAttackBuffs: CommonWeaponAttackBuffId[];
  commonDamageBuffs: CommonWeaponDamageBuffId[];

  attackBuffs: AttackBuffDefinition[];
  damageBuffs: DamageBuffDefinition[];
}

export function getWeaponDefinition(id: WeaponName): WeaponDefinition {
  return weaponDefinitions.byId[id];
}
