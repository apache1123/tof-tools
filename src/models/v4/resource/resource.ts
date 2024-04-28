import BigNumber from 'bignumber.js';

import { minEventDuration } from '../../../constants/tick';
import type { Serializable } from '../../persistable';
import { ResourceEvent } from '../resource-timeline/resource-event';
import type { ResourceTimeline } from '../resource-timeline/resource-timeline';
import { TimeInterval } from '../time-interval/time-interval';
import type { ResourceDto } from './dtos/resource-dto';
import type { ResourceDefinition, ResourceId } from './resource-definition';
import type { ResourceRegenerationDefinition } from './resource-regeneration-definition';

export class Resource implements Serializable<ResourceDto> {
  public readonly id: ResourceId;
  public readonly displayName: string;
  public readonly maxAmount: number;
  public readonly startingAmount: number;
  public readonly regenerationDefinition: ResourceRegenerationDefinition;

  public readonly timeline: ResourceTimeline;

  public constructor(
    definition: ResourceDefinition,
    timeline: ResourceTimeline
  ) {
    const { id, displayName, maxAmount, startingAmount, regenerate } =
      definition;
    this.id = id;
    this.displayName = displayName;
    this.maxAmount = maxAmount;
    this.startingAmount = startingAmount ?? 0;
    this.regenerationDefinition = { ...regenerate };

    this.timeline = timeline;
  }

  /** Cumulated amount of resource up to (but not including) a point of time */
  public getCumulatedAmount(time: number) {
    return this.timeline.getCumulatedAmount(time);
  }

  /** Is the resource depleted at a point of time (but not including that point of time) */
  public isDepleted(time: number) {
    return this.getCumulatedAmount(time) === 0;
  }

  public get minAmount() {
    return 0;
  }

  public get events() {
    return this.timeline.events;
  }

  public get lastEvent() {
    return this.timeline.lastEvent;
  }

  /** Adds a resource event at a point of time. The amount of resource cannot be added past the max amount or cannot be subtracted past 0.
   * @param amount The amount of resource to add; can be negative
   * @param hasPriority If true, this resource event will overwrite existing ones in the time interval. If false, this resource event will not be added (or be cut short) if there is an existing resource event with priority.
   * @returns a resource event if one has been added
   */
  public addResourceEvent(
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

    const existingEvents =
      this.getResourceEventsOverlappingInterval(timeInterval);
    if (hasPriority) {
      // Assuming existing events are always before the event being added
      // Cut short existing events, removing when needed
      for (const existingEvent of existingEvents) {
        if (existingEvent.startTime < timeInterval.startTime) {
          existingEvent.endTime = timeInterval.startTime;

          if (existingEvent.startTime === existingEvent.endTime) {
            this.timeline.removeEvent(existingEvent);
          }
        } else {
          // Existing event has same start time as event being added
          this.timeline.removeEvent(existingEvent);
        }
      }

      // Re-calculate the amount to add after existing events potentially being removed
      amountToAdd = calculateAmountToAdd();
      if (!amountToAdd) return;
    } else if (
      existingEvents.some((existingEvent) => existingEvent.hasPriority)
    ) {
      // event being added doesn't have priority, but an existing one does, don't add
      return;
    }

    const resourceEvent = new ResourceEvent(
      timeInterval,
      this,
      amountToAdd,
      hasPriority
    );
    this.timeline.addEvent(resourceEvent);
    return resourceEvent;
  }

  public deplete(timeInterval: TimeInterval, hasPriority = false) {
    const amount = this.getCumulatedAmount(timeInterval.startTime);
    if (amount) {
      this.addResourceEvent(timeInterval, -amount, hasPriority);
    }
  }

  /** Adds the defined starting amount of resource, e.g. before combat start */
  public addStartingAmount() {
    const { startingAmount } = this;
    if (!startingAmount) return;
    this.addResourceEvent(
      new TimeInterval(-minEventDuration, 0),
      startingAmount
    );
  }

  public getResourceEventsOverlappingInterval(timeInterval: TimeInterval) {
    return this.timeline.getEventsOverlappingInterval(
      timeInterval.startTime,
      timeInterval.endTime
    );
  }

  public toDto(): ResourceDto {
    const { id, displayName, timeline } = this;
    return {
      id,
      displayName,
      timeline: timeline.toDto(),
      version: 1,
    };
  }
}
