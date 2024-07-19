import { minEventDuration } from '../../../constants/tick';
import type { Serializable } from '../../persistable';
import type { AbilityEvent } from '../ability-timeline/ability-event';
import type { AbilityTimeline } from '../ability-timeline/ability-timeline';
import type { TickTracker } from '../tick-tracker';
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
  protected get triggerTime() {
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

  /** Returns any ability events overlapping with the current tick */
  public getActiveEvents(): T[] {
    return this.timeline.getEventsOverlappingInterval(
      this.tickTracker.currentTickStart,
      this.tickTracker.currentTickEnd
    );
  }

  /** End any active ability events at the current start time */
  public endActiveEvents() {
    const endTime = this.triggerTime + minEventDuration;
    this.timeline.endAnyEventsAt(endTime);
  }

  /** Check if the ability is active at the start of the current start time */
  public isActive() {
    return this.timeline.hasEventAt(this.triggerTime);
  }

  /** Check if the ability is on cooldown at the start of the current start time */
  public isOnCooldown() {
    return this.timeline.hasEventOnCooldownAt(this.triggerTime);
  }

  public toDto(): AbilityDto {
    const { id, displayName, timeline } = this;
    return { id, displayName, timeline: timeline.toDto(), version: 1 };
  }
}
