import { minEventDuration } from '../../../constants/tick';
import type { Serializable } from '../../persistable';
import type { TickTracker } from '../tick/tick-tracker';
import { TimeInterval } from '../time-interval/time-interval';
import type { AbilityDefinition, AbilityId } from './ability-definition';
import type { AbilityEndedBy } from './ability-ended-by';
import type { AbilityEvent } from './ability-event';
import type { AbilityTimeline } from './ability-timeline';
import type { AbilityUpdatesResource } from './ability-updates-resource';
import type { AbilityDto } from './dtos/ability-dto';

/** An ability is anything a character does. Attacks, buffs etc. are all considered abilities. */
export class Ability<T extends AbilityEvent = AbilityEvent>
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
    return this.addEvent(this.getNewEventTimeInterval());
  }

  protected addEvent(timeInterval: TimeInterval): T {
    throw new Error('Not implemented');
  }

  private getNewEventTimeInterval(): TimeInterval {
    const startTime = this.triggerTime;
    let endTime!: number;

    const {
      duration,
      combatEnd,
      buffEnd,
      activeWeapon,
      notActiveWeapon,
      resourceDepleted,
    } = this.endedBy;
    if (duration) {
      endTime = startTime + duration;
    } else if (
      combatEnd ||
      buffEnd ||
      activeWeapon ||
      notActiveWeapon ||
      resourceDepleted
    ) {
      // For abilities that are ended by a certain condition, set the end time to be the timeline's end time. The ability event will be ended by an event related to that condition
      endTime = this.timeline.endTime;
    } else {
      throw new Error('Cannot determine ability event end time');
    }

    return new TimeInterval(startTime, endTime);
  }

  /** End any active ability events at the current start time */
  public endActiveEvents() {
    const endTime = this.triggerTime + minEventDuration;
    this.timeline.endAnyEventsAt(endTime);
  }

  /** Check if the ability is on cooldown at the start of the current start time */
  public isOnCooldown() {
    return this.timeline.events.some((event) =>
      event.isOnCooldown(this.triggerTime)
    );
  }

  public toDto(): AbilityDto {
    const { id, displayName, timeline } = this;
    return { id, displayName, timeline: timeline.toDto(), version: 1 };
  }
}
