import { minEventDuration } from '../../../constants/tick';
import type { Serializable } from '../../persistable';
import type { AbilityEvent } from '../ability-timeline/ability-event';
import type { AbilityTimeline } from '../ability-timeline/ability-timeline';
import type { TickTracker } from '../tick-tracker';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AbilityDefinition, AbilityId } from './ability-definition';
import type { AbilityEndedBy } from './ability-ended-by';
import type { AbilityUpdatesResource } from './ability-updates-resource';
import type { AbilityDto } from './dtos/ability-dto';

/** An ability is anything a character does. Attacks, buffs etc. are all considered abilities. */
export abstract class Ability<T extends AbilityEvent = AbilityEvent>
  implements Serializable<AbilityDto>
{
  public readonly id: AbilityId;
  public readonly displayName: string;
  public readonly cooldown: number;
  public readonly endedBy: AbilityEndedBy;
  public readonly updatesResources: AbilityUpdatesResource[];

  public readonly timeline: AbilityTimeline<T>;

  private readonly tickTracker: TickTracker;

  public constructor(
    definition: AbilityDefinition,
    timeline: AbilityTimeline<T>,
    tickTracker: TickTracker
  ) {
    const { id, displayName, cooldown, endedBy, updatesResources } = definition;
    this.id = id;
    this.displayName = displayName;
    this.cooldown = cooldown;
    this.endedBy = endedBy;
    this.updatesResources = updatesResources ?? [];

    this.timeline = timeline;
    this.tickTracker = tickTracker;
  }

  public get lastEvent() {
    return this.timeline.lastEvent;
  }

  /** The time that any new actions to be performed by the ability will start */
  public getTriggerTime() {
    return this.tickTracker.currentTickStart;
  }

  public canTrigger(): boolean {
    return !this.isOnCooldown();
  }

  /** Trigger the ability at the current start time */
  public trigger(): T | undefined {
    if (!this.canTrigger()) return;
    return this.addEvent();
  }

  protected abstract addEvent(): T;

  /** End any active ability events at the current start time */
  public endActiveEvents(): T[] {
    const endTime = this.getTriggerTime() + minEventDuration;
    return this.timeline.endAnyEventsAt(endTime);
  }

  /** Check if the ability is active at the start of the current start time */
  public isActive() {
    return this.isActiveAt(this.getTriggerTime());
  }

  /** Check if the ability is on cooldown at the start of the current start time */
  public isOnCooldown() {
    return this.isOnCooldownAt(this.getTriggerTime());
  }

  public isActiveAt(time: number) {
    return this.timeline.hasEventAt(time);
  }

  public isOnCooldownAt(time: number) {
    return this.timeline.hasEventOnCooldownAt(time);
  }

  public getEventsOverlappingInterval(timeInterval: TimeInterval) {
    return this.timeline.getEventsOverlappingInterval(
      timeInterval.startTime,
      timeInterval.endTime
    );
  }

  public getEventsEndingBetween(timeInterval: TimeInterval) {
    return this.timeline.getEventsEndingBetween(timeInterval);
  }

  public toDto(): AbilityDto {
    const { id, displayName, timeline } = this;
    return { id, displayName, timeline: timeline.toDto(), version: 1 };
  }
}
