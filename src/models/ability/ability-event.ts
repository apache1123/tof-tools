import BigNumber from "bignumber.js";

import { oneSecondDuration } from "../../utils/time-utils";
import type { EventManager } from "../event/event-manager";
import type { EventSubscriber } from "../event/event-subscriber";
import type { Serializable } from "../persistable";
import type { CurrentTick } from "../tick/current-tick";
import type { Tick } from "../tick/tick";
import type { TimeInterval } from "../time-interval/time-interval";
import { TimelineEvent } from "../timeline/timeline-event";
import type { AbilityId } from "./ability-id";
import type { AbilityUpdatesResource } from "./ability-updates-resource";
import type { AbilityEventDto } from "./dtos/ability-event-dto";

/** An ability event is produced when that ability is performed, spanning over a time interval and has a cooldown etc.  */
export abstract class AbilityEvent
  extends TimelineEvent
  implements EventSubscriber, Serializable<AbilityEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    public abilityId: AbilityId,
    public cooldown: number,
    private readonly updatesResources: AbilityUpdatesResource[],
    protected readonly eventManager: EventManager,
    protected readonly currentTick: CurrentTick,
  ) {
    super(timeInterval);
    this.cooldown = cooldown;
  }

  public subscribeToEvents(): void {
    this.eventManager.onTickAdvancing(this.handleTickAdvancing.bind(this));
  }

  /** Cooldown ends at a point of time (exclusive) */
  private get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }

  public isOnCooldown(time: number) {
    return this.startTime <= time && time < this.cooldownEndsAt;
  }

  private handleTickAdvancing() {
    const currentTick = this.currentTick.value;
    this.updateResources(currentTick);
    this.handleAbilityEnding(currentTick);
    this.additionalProcessing(currentTick);
  }

  protected abstract additionalProcessing(tick: Tick): void;

  /** Updates resources for the duration of the tick */
  private updateResources(tick: Tick) {
    if (!this.timeInterval.includes(tick.startTime)) return;

    for (const updatesResource of this.updatesResources) {
      const {
        resourceId,
        amount,
        amountPerSecond,
        depleteResource,
        hasPriority,
      } = updatesResource;

      if (depleteResource) {
        this.eventManager.publishResourceDepleteRequest({ id: resourceId });
        continue;
      }

      if (!amount && !amountPerSecond) continue;

      const { duration } = tick;
      let resolvedAmount!: number;
      // Resource updates over the duration of the tick, so work out how much to add per tick.
      // Assume for a flat amount of resources to add, linearly distribute it over the duration of the event
      if (amount) {
        resolvedAmount = BigNumber(amount)
          .times(duration)
          .div(this.duration)
          .toNumber();
      }
      if (amountPerSecond) {
        resolvedAmount = BigNumber(amountPerSecond)
          .times(duration)
          .div(oneSecondDuration)
          .toNumber();
      }

      this.eventManager.publishResourceUpdateRequest({
        id: resourceId,
        amount: resolvedAmount,
        hasPriority: !!hasPriority,
      });
    }
  }

  /** Notify ability end if the end time of this event is in the current tick and remove the subscription to the event manager */
  private handleAbilityEnding(tick: Tick) {
    if (tick.includes(this.endTime)) {
      this.eventManager.publishAbilityEnded({ id: this.abilityId });

      this.eventManager.unsubscribeToTickAdvancing(
        this.handleTickAdvancing.bind(this),
      );
    }
  }
}

/** A concrete class that extends the abstract class to aid testing */
export class ConcreteAbilityEvent extends AbilityEvent {
  protected override additionalProcessing(): void {
    return;
  }
}
