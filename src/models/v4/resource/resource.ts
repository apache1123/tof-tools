import BigNumber from 'bignumber.js';

import { minActionDuration, tickDuration } from '../../../constants/tick';
import { sum } from '../../../utils/math-utils';
import { TimePeriod } from '../time-period';
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

  /** Cumulated amount of resource at a point of time */
  public getCumulatedAmount(time: number) {
    const timePeriod = new TimePeriod(-minActionDuration, time); // start time is negative because there could be an action that adds the starting amount of a resource before the combat start time of time=0
    const resourceActions = this.timeline.getActionsEndingBetween(timePeriod);
    return sum(...resourceActions.map((action) => action.amount)).toNumber();
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
   * @param amount the amount of resource to add; can be negative
   * @returns a resource action if one has been added
   */
  public addResourceAction(timePeriod: TimePeriod, amount: number) {
    if (!amount) return;

    const cumulatedAmountPreceding = this.getCumulatedAmount(
      timePeriod.startTime
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

    const resourceAction = new ResourceAction(
      timePeriod,
      this.definition,
      amountToAdd
    );
    this.timeline.addAction(resourceAction);
    return resourceAction;
  }

  /** regenerate the resource amount for a tick period, if there are no other actions in that tick period
   * @returns the regenerate resource action if one has been added
   */
  public regenerate(tickStartTime: number) {
    const { regenerateAmountPerSecond } = this.definition;
    if (!regenerateAmountPerSecond) return;

    const tickEndTime = tickStartTime + tickDuration;
    const existingActions = this.timeline.getActionsOverlappingPeriod(
      tickStartTime,
      tickEndTime
    );
    if (existingActions.length) return;

    const regenerateAmount = BigNumber(regenerateAmountPerSecond)
      .times(tickDuration)
      .div(1000)
      .toNumber();
    return this.addResourceAction(
      new TimePeriod(tickStartTime, tickEndTime),
      regenerateAmount
    );
  }

  /** Adds the defined starting amount of resource, e.g. before combat start */
  public addStartingAmount() {
    const { startingAmount } = this.definition;
    if (!startingAmount) return;
    this.addResourceAction(
      new TimePeriod(-minActionDuration, 0),
      startingAmount
    );
  }
}
