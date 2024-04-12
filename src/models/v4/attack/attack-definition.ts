import type { AttackType } from '../../../constants/attack-type';
import type { WeaponName } from '../../../constants/weapon-definitions';
import type { ActionDefinition, ActionId } from '../action/action-definition';
import type { ActionRequirements } from '../action/action-requirements';
import type { TriggeredAction } from '../action/triggered-action';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackElementalType } from './attack-elemental-type';

export type AttackId = ActionId;

export interface AttackDefinition
  extends ActionDefinition,
    ActionRequirements,
    TriggeredAction {
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

export interface PlayerInputAttackDefinition extends AttackDefinition {
  triggeredBy: {
    playerInput: true;
  };
}

export interface NormalAttackDefinition extends PlayerInputAttackDefinition {
  type: 'normal';
}

export interface DodgeAttackDefinition extends PlayerInputAttackDefinition {
  type: 'dodge';
}

export interface SkillAttackDefinition extends PlayerInputAttackDefinition {
  type: 'skill';
}

export interface DischargeAttackDefinition extends PlayerInputAttackDefinition {
  type: 'discharge';

  requirements: {
    hasFullCharge: true;
    notActiveWeapon: WeaponName;
  };
}
