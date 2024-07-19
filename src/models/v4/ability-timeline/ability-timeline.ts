import type { Serializable } from '../../persistable';
import { Timeline } from '../timeline/timeline';
import type { AbilityEvent } from './ability-event';
import type { AbilityTimelineDto } from './dtos/ability-timeline-dto';

export class AbilityTimeline<T extends AbilityEvent = AbilityEvent>
  extends Timeline<T>
  implements Serializable<AbilityTimelineDto>
{
  public hasEventOnCooldownAt(time: number) {
    return this.events.some(
      (event) => event.startTime <= time && event.cooldownEndsAt > time
    );
  }

  /** Ends any active events overlapping with the time at that time.
   * Events will have have their end time set to the specified time, or removed if the specified time is equal to their start time.
   */
  public endAnyEventsAt(time: number) {
    const events = this.getEventsOverlappingTime(time);
    for (const event of events) {
      // Cut event short or remove it
      if (time > event.startTime) {
        event.endTime = time;
      } else {
        this.removeEvent(event);
      }
    }
  }
}
