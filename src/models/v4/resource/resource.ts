import BigNumber from 'bignumber.js';

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

  /** Is the resource depleted at a point of time (but not including that point of time) */
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

  public get resourceRegenerationDefinition() {
    return this.definition.regenerate;
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

    /** Calculate amount of resources to add so the result doesn't go over the max amount or under the min amount the resource can hold */
    const calculateAmountToAdd = () => {
      const cumulatedAmountPreceding = this.getCumulatedAmount(
        timeInterval.endTime
      );

      if (
        cumulatedAmountPreceding > this.maxAmount ||
        cumulatedAmountPreceding < this.minAmount
      )
        throw new Error(
          `Resource in an invalid state. Resource: ${this.id}; CumulatedAmount: ${cumulatedAmountPreceding}`
        );

      let amountToAdd: number;
      if (amount > 0) {
        amountToAdd =
          BigNumber(cumulatedAmountPreceding).plus(amount).toNumber() >
          this.maxAmount
            ? BigNumber(this.maxAmount)
                .minus(cumulatedAmountPreceding)
                .toNumber()
            : amount;
      } else {
        // Negative amount
        amountToAdd =
          BigNumber(cumulatedAmountPreceding).plus(amount).toNumber() <
          this.minAmount
            ? BigNumber(this.minAmount)
                .minus(cumulatedAmountPreceding)
                .toNumber()
            : amount;
      }
      return amountToAdd;
    };

    let amountToAdd = calculateAmountToAdd();
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

      // Re-calculate the amount to add after existing actions potentially being removed
      amountToAdd = calculateAmountToAdd();
      if (!amountToAdd) return;
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

  public deplete(timeInterval: TimeInterval, hasPriority = false) {
    const amount = this.getCumulatedAmount(timeInterval.startTime);
    if (amount) {
      this.addResourceAction(timeInterval, -amount, hasPriority);
    }
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
