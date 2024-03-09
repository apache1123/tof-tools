import { Timeline } from './timeline';
import type { TimelineEvent } from './timeline-event';
import type { TimelineEventData } from './timeline-event-data';

/** A timeline that forces adding events in chronological order i.e. a subsequent event cannot be added before the previous event has ended */
export class ChronologicalTimeline<
  TData extends TimelineEventData,
  TEvent extends TimelineEvent<TData> = TimelineEvent<TData>
> extends Timeline<TData, TEvent> {
  public get nextEarliestStartTime(): number {
    return this.lastEvent?.endTime ?? 0;
  }

  /** Adds a new event at the end of the timeline. The new event's start time cannot be earlier than the end time of the existing last event */
  public addEvent(event: TEvent) {
    if (event.startTime < this.nextEarliestStartTime) {
      throw new Error('Invalid startTime when adding a new TimelineEvent');
    }

    super.addEvent(event);
  }
}
