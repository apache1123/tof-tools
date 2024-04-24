import type { ActionDefinition, ActionId } from '../action/action-definition';
import type { ActionEndedBy } from '../action/action-ended-by';
import type { ActionRequirements } from '../action/action-requirements';
import type { ActionTriggeredBy } from '../action/action-triggered-by';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import type { AttackBuff } from './attack-buff';
import type { DamageBuff } from './damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export type BuffId = ActionId;

export interface BuffDefinition extends ActionDefinition {
  maxStacks: number;
  additionallyGainStacksBy?: {
    accumulatedDamageThreshold?: {
      /** e.g. dealing accumulated damage equal to 100 times of ATK */
      timesOfAttack?: number;
    };
  };

  attackBuffs?: AttackBuff[];
  damageBuffs?: DamageBuff[];
  miscBuff?: MiscellaneousBuff;

  triggeredBy: ActionTriggeredBy;
  endedBy: ActionEndedBy;

  requirements: ActionRequirements;

  updatesResources?: ActionUpdatesResource[];
}
