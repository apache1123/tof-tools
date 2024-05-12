import type { Serializable } from '../../persistable';
import type { AbilityEvent } from '../ability-timeline/ability-event';
import type { AbilityTimeline } from '../ability-timeline/ability-timeline';
import type { TimeInterval } from '../time-interval/time-interval';
import type { AbilityDefinition, AbilityId } from './ability-definition';
import type { AbilityEndedBy } from './ability-ended-by';
import type { AbilityTriggeredBy } from './ability-triggered-by';
import type { AbilityUpdatesResource } from './ability-updates-resource';
import type { AbilityDto } from './dtos/ability-dto';

/** An ability is anything a character does. Attacks, buffs etc. are all considered abilities. */
export abstract class Ability<T extends AbilityEvent>
  implements Serializable<AbilityDto>
{
  public readonly id: AbilityId;
  public readonly displayName: string;
  public readonly cooldown: number;

  public readonly triggeredBy: AbilityTriggeredBy;
  public readonly endedBy: AbilityEndedBy;
  public readonly updatesResources: AbilityUpdatesResource[];

  public readonly timeline: AbilityTimeline<T>;

  public constructor(
    definition: AbilityDefinition,
    timeline: AbilityTimeline<T>
  ) {
    const {
      id,
      displayName,
      cooldown,
      triggeredBy,
      endedBy,
      updatesResources,
    } = definition;
    this.id = id;
    this.displayName = displayName;
    this.cooldown = cooldown;
    this.triggeredBy = triggeredBy;
    this.endedBy = endedBy;
    this.updatesResources = updatesResources ?? [];

    this.timeline = timeline;
  }

  public abstract trigger(time: number): T;

  public endActiveEventsAt(time: number) {
    return this.timeline.endAnyEventsAt(time);
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
