import type { AttackType } from '../../../constants/attack-type';
import type { WeaponName } from '../../../constants/weapon-definitions';
import type { ActionDefinition, ActionId } from '../action/action-definition';
import type { ActionRequirements } from '../action/action-requirements';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackElementalType } from './attack-elemental-type';

export type AttackId = ActionId;

export interface AttackDefinition extends ActionDefinition, ActionRequirements {
  id: AttackId;
  type: AttackType;

  elementalType: AttackElementalType;

  damageModifiers: AttackDamageModifiers;

  /** in ms */
  duration: number;
  /** in ms */
  cooldown: number;

  charge: number;
}

export interface NormalAttackDefinition extends AttackDefinition {
  type: 'normal';
}

export interface DodgeAttackDefinition extends AttackDefinition {
  type: 'dodge';
}

export interface SkillAttackDefinition extends AttackDefinition {
  type: 'skill';
}

export interface DischargeAttackDefinition extends AttackDefinition {
  type: 'discharge';

  requirements: {
    hasFullCharge: true;
    notActiveWeapon: WeaponName;
  };
}
