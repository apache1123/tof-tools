import type { ActionDefinition, ActionId } from '../action/action-definition';
import type { ActionRequirements } from '../action/action-requirements';
import type { TriggeredAction } from '../action/triggered-action';
import type { AttackBuff } from './attack-buff';
import type { DamageBuff } from './damage-buff';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export type BuffId = ActionId;

export interface BuffDefinition
  extends ActionDefinition,
    TriggeredAction,
    ActionRequirements {
  maxStacks: number;
  additionallyGainStacksBy?: {
    accumulatedDamageThreshold?: {
      /** e.g. dealing accumulated damage equal to 100 times of ATK */
      timesOfAttack?: number;
    };
  };

  attackBuff?: AttackBuff;
  damageBuff?: DamageBuff;
  miscBuff?: MiscellaneousBuff;

  duration: {
    value?: number;
    /** Buff ends when active weapon changes */
    followActiveWeapon?: boolean;
    /** Number between 0 to 1. e.g. 0.7 = buff only applies to 0.7 of the combat duration at the end. The starting 30% has no buff. Useful for buffs like "increase damage dealt to targets with less than x% HP" */
    applyToEndSegmentOfCombat?: number;
    /** Buff lasts until combat ends */
    untilCombatEnd?: boolean;
  };
  /** Buff goes into cooldown when triggered and cannot be triggered again until cooldown ends */
  cooldown: number;
}
