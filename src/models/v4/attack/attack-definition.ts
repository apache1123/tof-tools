import type { AttackType } from '../../../constants/attack-type';
import type {
  chargeResourceId,
  dodgeResourceId,
  fullCharge,
} from '../../../constants/resources';
import type { WeaponName } from '../../../constants/weapon-definitions';
import type { ActionDefinition, ActionId } from '../action/action-definition';
import type { ActionEndedBy } from '../action/action-ended-by';
import type { ActionRequirements } from '../action/action-requirements';
import type { ActionTriggeredBy } from '../action/action-triggered-by';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackElementalType } from './attack-elemental-type';
import type { AttackHitCount } from './attack-hit-count';

export type AttackId = ActionId;

export interface AttackDefinition extends ActionDefinition {
  id: AttackId;
  type: AttackType;
  elementalType: AttackElementalType;
  damageModifiers: AttackDamageModifiers;
  hitCount: AttackHitCount;

  triggeredBy: ActionTriggeredBy;
  endedBy: ActionEndedBy;

  requirements: ActionRequirements;

  updatesResources?: ActionUpdatesResource[];
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

  requirements: {
    hasResource: {
      resourceId: typeof dodgeResourceId;
      minAmount: 1;
    };
  };
}

export interface SkillAttackDefinition extends PlayerInputAttackDefinition {
  type: 'skill';
}

export interface DischargeAttackDefinition extends PlayerInputAttackDefinition {
  type: 'discharge';

  requirements: {
    hasResource: {
      resourceId: typeof chargeResourceId;
      minAmount: typeof fullCharge;
    };
    notActiveWeapon: WeaponName;
  };
}
