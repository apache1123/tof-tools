import type { Weapon } from '../../weapon';
import type { ActionTimeCalculator } from '../action/action-time-calculator';
import type { TimeInterval } from '../time-interval';
import { AttackAction } from './attack-action';
import type { AttackDefinition } from './attack-definition';
import type { AttackTimeline } from './attack-timeline';

export class Attack {
  public readonly weapon: Weapon;
  public readonly definition: AttackDefinition;
  public readonly timeline: AttackTimeline;

  private readonly actionTimeCalculator: ActionTimeCalculator;

  public constructor(
    weapon: Weapon,
    definition: AttackDefinition,
    timeline: AttackTimeline,
    actionTimeCalculator: ActionTimeCalculator
  ) {
    this.weapon = weapon;
    this.definition = definition;
    this.timeline = timeline;
    this.actionTimeCalculator = actionTimeCalculator;
  }

  public get id() {
    return this.definition.id;
  }

  /** Is an attack that requires the weapon to be the active weapon to perform e.g. any sort of player input attack */
  public get isActiveWeaponAttack() {
    return !!this.definition.triggeredBy.playerInput;
  }

  public get isPlayerInputAttack() {
    return !!this.definition.triggeredBy.playerInput;
  }

  public get elementalType() {
    return this.definition.elementalType;
  }

  public get updatesResources() {
    return this.definition.updatesResources;
  }

  public get requirements() {
    return this.definition.requirements;
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
    const attackAction = new AttackAction(
      timeInterval,
      this.definition,
      this.weapon
    );
    return attackAction;
  }
}
