import BigNumber from 'bignumber.js';

import { oneSecondDuration } from '../../../utils/time-utils';
import type { Serializable } from '../../persistable';
import type { CombatContext } from '../combat-context/combat-context';
import type { EventManager } from '../event/event-manager';
import type { EventSubscriber } from '../event/event-subscriber';
import { ResourceEvent } from '../resource-timeline/resource-event';
import type { ResourceTimeline } from '../resource-timeline/resource-timeline';
import type { CurrentTick } from '../tick/current-tick';
import type { TimeInterval } from '../time-interval/time-interval';
import type { ResourceDto } from './dtos/resource-dto';
import type { ResourceId } from './resource-definition';
import type { ResourceRegenerationDefinition } from './resource-regeneration-definition';

export class Resource implements EventSubscriber, Serializable<ResourceDto> {
  public constructor(
    public readonly id: ResourceId,
    public readonly displayName: string,
    private readonly maxAmount: number,
    private readonly startingAmount: number,
    private readonly regenerationDefinition: ResourceRegenerationDefinition,
    protected readonly timeline: ResourceTimeline,
    protected readonly eventManager: EventManager,
    protected readonly context: CombatContext
  ) {}

  private readonly minAmount = 0;

  public subscribeToEvents(): void {
    this.eventManager.onResourceUpdateRequest((request) => {
      if (request.id === this.id) {
        this.add(request.amount, request.hasPriority);
      }
    });

    this.eventManager.onResourceDepleteRequest((request) => {
      if (request.id === this.id) {
        this.deplete();
      }
    });
  }

  /** Adds a resource event to add/subtract the resource amount at the current tick. The amount of resource cannot be added past the max amount or cannot be subtracted past the min amount.
   * @param amount The amount of resource to add; can be negative
   * @param hasPriority If true, will always have priority over other resource events in that time interval, overwriting them
   * @returns a resource event if one has been added
   */
  public add(amount: number, hasPriority = false) {
    return (
      this.addResourceEvent(this.context.currentTick, amount, hasPriority) ??
      undefined
    );
  }

  /** Adds a resource event to deplete the resource at the current tick. Will always have priority over other resource events in that time interval */
  public deplete() {
    const currentTick = this.context.currentTick;
    const amount = this.getCumulatedAmountAt(currentTick.startTime);
    if (amount <= this.minAmount) return;

    this.addResourceEvent(currentTick, -amount, true);
  }

  /** Called when all resource events have been added for the current tick. Determines the result of all resource events that occurred during the current tick and fires off events accordingly */
  public process() {
    const currentTick = this.context.currentTick;
    this.passiveRegenerate(currentTick);

    const startingAmount = this.getCumulatedAmountAt(currentTick.startTime);
    const endingAmount = this.getCumulatedAmountAt(currentTick.endTime);

    if (startingAmount === endingAmount) return;

    this.eventManager.publishResourceUpdated({
      id: this.id,
      amount: endingAmount,
    });
  }

  /** Current cumulated amount of resource (at the start of the current tick) */
  public getCumulatedAmount() {
    return this.getCumulatedAmountAt(this.context.currentTick.startTime);
  }

  /** Adds the defined starting amount of resource, e.g. before combat start */
  public addStartingAmount() {
    const { startingAmount } = this;
    if (!startingAmount) return;
    this.addResourceEvent(this.context.currentTick, startingAmount);
  }

  private getCumulatedAmountAt(time: number) {
    return this.timeline.getCumulatedAmount(time);
  }

  /** Adds a resource event to add/subtract the resource amount at the current tick. The amount of resource cannot be added past the max amount or cannot be subtracted past the min amount.
   * @param amount The amount of resource to add; can be negative
   * @param hasPriority If true, this resource event will overwrite existing ones in the time interval. If false, this resource event will not be added (or be cut short) if there is an existing resource event with priority.
   * @returns a resource event if one has been added
   */
  private addResourceEvent(
    currentTick: CurrentTick,
    amount: number,
    hasPriority = false
  ) {
    if (!amount) return;

    /** Calculate amount of resources to add so the result doesn't go over the max amount or under the min amount the resource can hold */
    const calculateAmountToAdd = () => {
      const cumulatedAmountPreceding = this.getCumulatedAmountAt(
        currentTick.startTime
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

    const existingEvents = this.getEvents(currentTick);
    if (hasPriority) {
      // Assuming existing events are always before the event being added
      // Cut short existing events, removing when needed
      for (const existingEvent of existingEvents) {
        if (existingEvent.startTime < currentTick.startTime) {
          existingEvent.endTime = currentTick.startTime;

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
      currentTick,
      amountToAdd,
      hasPriority
    );
    this.timeline.addEvent(resourceEvent);
    return resourceEvent;
  }

  /** Passively regenerate the resource amount for the current tick according to the resource definition.
   * - Only when there are no other resource events added in the tick
   */
  private passiveRegenerate(currentTick: CurrentTick) {
    if (!this.regenerationDefinition) return;

    const existingEvents = this.getEvents(currentTick);
    if (existingEvents.length) return;

    const regenerateAmount = this.calculateRegenerateAmount(currentTick);
    this.addResourceEvent(currentTick, regenerateAmount);
  }

  private calculateRegenerateAmount(currentTick: CurrentTick) {
    const { amountPerSecond } = this.regenerationDefinition;

    if (amountPerSecond)
      return BigNumber(amountPerSecond)
        .times(currentTick.duration)
        .div(oneSecondDuration)
        .toNumber();

    return 0;
  }

  private getEvents(currentTick: TimeInterval) {
    return this.timeline.getEventsOverlapping(currentTick);
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
