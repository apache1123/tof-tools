import type { AttackType } from '../../../constants/attack-type';
import type { Weapon } from '../../weapon';
import type { ActionEndedBy } from '../action/action-ended-by';
import type { ActionRequirements } from '../action/action-requirements';
import type { ActionTimeCalculator } from '../action/action-time-calculator';
import type { ActionTriggeredBy } from '../action/action-triggered-by';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import type { TimeInterval } from '../time-interval';
import { AttackAction } from './attack-action';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackDefinition, AttackId } from './attack-definition';
import type { AttackElementalType } from './attack-elemental-type';
import type { AttackHitCount } from './attack-hit-count';
import type { AttackTimeline } from './attack-timeline';

export class Attack {
  public readonly id: AttackId;
  public readonly displayName: string;
  public readonly elementalType: AttackElementalType;
  public readonly type: AttackType;
  public readonly damageModifiers: AttackDamageModifiers;
  public readonly cooldown: number;
  public readonly hitCount: AttackHitCount;
  public readonly triggeredBy: ActionTriggeredBy;
  public readonly endedBy: ActionEndedBy;
  public readonly requirements: ActionRequirements;
  public readonly updatesResources: ActionUpdatesResource[];
  public readonly doesNotTriggerEvents: boolean;

  public readonly weapon: Weapon;
  public readonly timeline: AttackTimeline;

  private readonly actionTimeCalculator: ActionTimeCalculator;

  public constructor(
    weapon: Weapon,
    definition: AttackDefinition,
    timeline: AttackTimeline,
    actionTimeCalculator: ActionTimeCalculator
  ) {
    const {
      id,
      displayName,
      elementalType,
      type,
      damageModifiers,
      cooldown,
      hitCount,
      triggeredBy,
      endedBy,
      requirements,
      updatesResources,
      doesNotTriggerEvents,
    } = definition;
    this.id = id;
    this.displayName = displayName;
    this.elementalType = { ...elementalType };
    this.type = type;
    this.damageModifiers = { ...damageModifiers };
    this.cooldown = cooldown;
    this.hitCount = { ...hitCount };
    this.triggeredBy = { ...triggeredBy };
    this.endedBy = { ...endedBy };
    this.requirements = { ...requirements };
    this.updatesResources = updatesResources?.map((x) => ({ ...x })) ?? [];
    this.doesNotTriggerEvents = !!doesNotTriggerEvents;

    this.weapon = weapon;
    this.timeline = timeline;
    this.actionTimeCalculator = actionTimeCalculator;
  }

  /** Is an attack that requires the weapon to be the active weapon to perform e.g. any sort of player input attack */
  public get isActiveWeaponAttack() {
    return !!this.triggeredBy.playerInput;
  }

  public get isPlayerInputAttack() {
    return !!this.triggeredBy.playerInput;
  }

  public trigger(time: number): AttackAction {
    const attackAction = this.createNewAttackAction(time);
    this.timeline.addAttackAction(attackAction);
    return attackAction;
  }

  public endActiveAttacksAt(time: number) {
    return this.timeline.endAnyActionsAt(time);
  }

  public getAttackActionsOverlappingInterval(timeInterval: TimeInterval) {
    return this.timeline.getActionsOverlappingInterval(
      timeInterval.startTime,
      timeInterval.endTime
    );
  }

  public getAttackActionsEndingBetween(timeInterval: TimeInterval) {
    return this.timeline.getActionsEndingBetween(timeInterval);
  }

  private createNewAttackAction(time: number) {
    const timeInterval =
      this.actionTimeCalculator.calculateActionTimeInterval(time);
    const attackAction = new AttackAction(timeInterval, this, this.weapon);
    return attackAction;
  }
}
