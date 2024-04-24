import { minActionDuration } from '../../../constants/tick';
import { sum } from '../../../utils/math-utils';
import { TimeInterval } from '../time-interval';
import type { Timeline } from '../timeline/timeline';
import { ResourceAction } from './resource-action';
import type { ResourceDefinition } from './resource-definition';

export class Resource {
  public readonly definition: ResourceDefinition;
  public readonly timeline: Timeline<ResourceAction>;

  public constructor(
    definition: ResourceDefinition,
    timeline: Timeline<ResourceAction>
  ) {
    this.definition = definition;
    this.timeline = timeline;
  }

  /** Cumulated amount of resource up to (but not including) a point of time */
  public getCumulatedAmount(time: number) {
    const timeInterval = new TimeInterval(-minActionDuration, time); // start time is negative because there could be an action that adds the starting amount of a resource before the combat start time of time=0
    const resourceActions = this.timeline.getActionsEndingBetween(timeInterval);
    return sum(...resourceActions.map((action) => action.amount)).toNumber();
  }

  public isDepleted(time: number) {
    return this.getCumulatedAmount(time) === 0;
  }

  public get id() {
    return this.definition.id;
  }

  public get maxAmount() {
    return this.definition.maxAmount;
  }

  public get minAmount() {
    return 0;
  }

  public get actions() {
    return this.timeline.actions;
  }

  public get lastAction() {
    return this.timeline.lastAction;
  }

  /** Adds a resource action at a point of time. The amount of resource cannot be added past the max amount or cannot be subtracted past 0.
   * @param amount The amount of resource to add; can be negative
   * @param hasPriority If true, this resource action will overwrite existing ones in the time interval. If false, this resource action will not be added (or be cut short) if there is an existing resource action with priority.
   * @returns a resource action if one has been added
   */
  public addResourceAction(
    timeInterval: TimeInterval,
    amount: number,
    hasPriority = false
  ) {
    if (!amount) return;

    const cumulatedAmountPreceding = this.getCumulatedAmount(
      timeInterval.endTime
    );

    if (
      cumulatedAmountPreceding > this.maxAmount ||
      cumulatedAmountPreceding < this.minAmount
    )
      return;

    let amountToAdd: number;
    if (amount > 0) {
      amountToAdd =
        cumulatedAmountPreceding + amount > this.maxAmount
          ? this.maxAmount - cumulatedAmountPreceding
          : amount;
    } else {
      // Negative amount
      amountToAdd =
        cumulatedAmountPreceding + amount < this.minAmount
          ? cumulatedAmountPreceding - this.minAmount
          : amount;
    }

    if (!amountToAdd) return;

    const existingActions =
      this.getResourceActionsOverlappingInterval(timeInterval);
    if (hasPriority) {
      // Assuming existing actions are always before the action being added
      // Cut short existing actions, removing when needed
      for (const existingAction of existingActions) {
        if (existingAction.startTime < timeInterval.startTime) {
          existingAction.endTime = timeInterval.startTime;

          if (existingAction.startTime === existingAction.endTime) {
            this.timeline.removeAction(existingAction);
          }
        } else {
          // Existing action has same start time as action being added
          this.timeline.removeAction(existingAction);
        }
      }
    } else if (
      existingActions.some((existingAction) => existingAction.hasPriority)
    ) {
      // Action being added doesn't have priority, but an existing one does, don't add
      return;
    }

    const resourceAction = new ResourceAction(
      timeInterval,
      this.definition,
      amountToAdd,
      hasPriority
    );
    this.timeline.addAction(resourceAction);
    return resourceAction;
  }

  /** Adds the defined starting amount of resource, e.g. before combat start */
  public addStartingAmount() {
    const { startingAmount } = this.definition;
    if (!startingAmount) return;
    this.addResourceAction(
      new TimeInterval(-minActionDuration, 0),
      startingAmount
    );
  }

  public getResourceActionsOverlappingInterval(timeInterval: TimeInterval) {
    return this.timeline.getActionsOverlappingInterval(
      timeInterval.startTime,
      timeInterval.endTime
    );
  }
}
