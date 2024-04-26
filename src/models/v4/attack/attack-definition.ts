import type { AttackType } from '../../../constants/attack-type';
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
