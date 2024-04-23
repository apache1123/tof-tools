import type { Weapon } from '../../weapon';
import type { ActionTimeCalculator } from '../action/action-time-calculator';
import type { TimePeriod } from '../time-period';
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

  public get updatesResources() {
    return this.definition.updatesResources;
  }

  public trigger(time: number): AttackAction {
    const attackAction = this.createNewAttackAction(time);
    this.timeline.addAttackAction(attackAction);
    return attackAction;
  }

  public endActiveAttacksAt(time: number) {
    return this.timeline.endAnyActionsAt(time);
  }

  public getAttackActionsOverlappingPeriod(timePeriod: TimePeriod) {
    return this.timeline.getActionsOverlappingPeriod(
      timePeriod.startTime,
      timePeriod.endTime
    );
  }

  public getAttackActionsEndingBetween(timePeriod: TimePeriod) {
    return this.timeline.getActionsEndingBetween(timePeriod);
  }

  private createNewAttackAction(time: number) {
    const timePeriod =
      this.actionTimeCalculator.calculateActionTimePeriod(time);
    const attackAction = new AttackAction(
      timePeriod,
      this.definition,
      this.weapon
    );
    return attackAction;
  }
}
