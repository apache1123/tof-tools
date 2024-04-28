import type { Serializable } from '../../persistable';
import { Timeline } from '../timeline/timeline';
import type { AbilityEvent } from './ability-event';
import type { AbilityTimelineDto } from './dtos/ability-timeline-dto';

export class AbilityTimeline<T extends AbilityEvent = AbilityEvent>
  extends Timeline<T>
  implements Serializable<AbilityTimelineDto>
{
  public isAbilityActiveAt(time: number) {
    return this.getEventsOverlappingTime(time).length !== 0;
  }

  public isAbilityOnCooldownAt(time: number) {
    return this.events.some(
      (event) => event.startTime <= time && event.cooldownEndsAt > time
    );
  }

  /** Ends any active events overlapping with the time at that time
   * @returns events that have been ended
   */
  public endAnyEventsAt(time: number) {
    const events = this.getEventsOverlappingTime(time);
    for (const event of events) {
      event.endTime = time;
    }
    return events;
  }
}
