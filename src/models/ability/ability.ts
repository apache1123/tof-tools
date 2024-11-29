import type { EventManager } from "../event/event-manager";
import type { EventSubscriber } from "../event/event-subscriber";
import type { Serializable } from "../persistable";
import type { CurrentTick } from "../tick/current-tick";
import { TimeInterval } from "../time-interval/time-interval";
import type { AbilityEvent } from "./ability-event";
import { ConcreteAbilityEvent } from "./ability-event";
import type { AbilityId } from "./ability-id";
import type { AbilityRequirements } from "./ability-requirements";
import type { AbilityTimeline } from "./ability-timeline";
import type { AbilityTriggerOptions } from "./ability-trigger-options";
import type { AbilityUpdatesResource } from "./ability-updates-resource";
import type { AbilityDto } from "./dtos/ability-dto";

/** An ability is anything a character does. Attacks, buffs etc. are all considered abilities. */
export abstract class Ability<TAbilityEvent extends AbilityEvent = AbilityEvent>
  implements EventSubscriber, Serializable<AbilityDto>
{
  public constructor(
    public readonly id: AbilityId,
    protected readonly displayName: string,
    protected readonly cooldown: number,
    protected readonly duration: number | undefined,
    protected readonly canBePlayerTriggered: boolean,
    protected readonly requirements: AbilityRequirements,
    protected readonly updatesResources: AbilityUpdatesResource[],
    protected readonly timeline: AbilityTimeline<TAbilityEvent>,
    protected readonly eventManager: EventManager,
    protected readonly currentTick: CurrentTick,
  ) {}

  public subscribeToEvents(): void {
    this.eventManager.onTickAdvancing(this.handleTickAdvancing.bind(this));
  }

  protected getTriggerTime() {
    return this.currentTick.startTime;
  }

  public canTrigger() {
    return (
      !this.timeline.hasEventOnCooldownAt(this.getTriggerTime()) &&
      this.haveRequirementsBeenMet()
    );
  }

  public canPlayerTrigger() {
    return this.canBePlayerTriggered && this.canTrigger();
  }

  /** Trigger an ability event */
  public trigger(options?: AbilityTriggerOptions) {
    if (!this.canTrigger()) return;

    const newEventTimeInterval = this.getNewEventTimeInterval(
      options?.duration,
    );
    const newEvent = this.createNewEvent(newEventTimeInterval);
    this.timeline.addEvent(newEvent);
    newEvent.subscribeToEvents();

    this.eventManager.publishAbilityStarted({ id: this.id });
  }

  /** Has ongoing events */
  public isOngoing() {
    return this.getOngoingEvents().length > 0;
  }

  /** Perform whatever actions needed during the current tick for this ability. Emit events, update resources, etc. */
  private handleTickAdvancing() {
    const ongoingEvents = this.getOngoingEvents();
    if (ongoingEvents.length === 0) return;

    // Terminate any ongoing events if the requirements for this ability are no longer met
    if (!this.haveRequirementsBeenMet()) this.terminate();
  }

  protected getOngoingEvents(): TAbilityEvent[] {
    return this.timeline.getEventsOverlapping(this.currentTick.value);
  }

  protected abstract createNewEvent(timeInterval: TimeInterval): TAbilityEvent;

  /** Terminate any active ability events */
  private terminate() {
    this.timeline.endAnyEventsAt(this.currentTick.endTime);
  }

  private haveRequirementsBeenMet() {
    return this.requirements.haveBeenMet();
  }

  private getNewEventTimeInterval(specifiedDuration?: number): TimeInterval {
    const startTime = this.getTriggerTime();
    // If no specified duration, use the ability's default duration. If no default duration, assume ability is open-ended and set it to end when the timeline ends
    const endTime = specifiedDuration
      ? startTime + specifiedDuration
      : this.duration
        ? startTime + this.duration
        : this.timeline.endTime;

    return new TimeInterval(startTime, endTime);
  }

  public toDto(): AbilityDto {
    const { id, displayName, timeline } = this;
    return { id, displayName, timeline: timeline.toDto(), version: 1 };
  }
}

/** A concrete class that extends the abstract class to aid testing */
export class ConcreteAbility extends Ability<AbilityEvent> {
  protected override createNewEvent(timeInterval: TimeInterval): AbilityEvent {
    return new ConcreteAbilityEvent(
      timeInterval,
      this.id,
      this.cooldown,
      this.updatesResources,
      this.eventManager,
      this.currentTick,
    );
  }
}
