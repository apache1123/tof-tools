import { ChronologicalTimeline } from './chronological-timeline';
import { StackableTimelineEvent } from './stackable-timeline-event';
import type { TimelineEventData } from './timeline-event-data';

/** A timeline where events can have "stacks" e.g. a damage buff could have 2 stacks of "+10%". Events will still be linear/chronological, however. Adding an event that overlaps with an existing event will increase the "stack" over the overlapping time period, if possible. Assuming all events are the same "type", and are all stackable with each other */
export class StackableChronologicalTimeline<
  TData extends TimelineEventData
> extends ChronologicalTimeline<TData, StackableTimelineEvent<TData>> {
  /** Adds an event to the end of the timeline. The new event can overlap with the last existing event in the timeline, but cannot be before it */
  public addEvent(event: StackableTimelineEvent<TData>) {
    const { lastEvent } = this;

    if (lastEvent && event.startTime < lastEvent.startTime) {
      throw new Error(
        'Cannot add an event that is earlier than the latest event'
      );
    }

    if (lastEvent && event.startTime < lastEvent.endTime) {
      const newStacksOfOverlappingPeriod = Math.min(
        lastEvent.stacks + event.stacks,
        lastEvent.maxStacks
      );

      if (newStacksOfOverlappingPeriod === lastEvent.stacks) {
        const newEvent = new StackableTimelineEvent<TData>(
          lastEvent.endTime,
          event.duration,
          event.data,
          event.maxStacks,
          event.stacks
        );
        super.addEvent(newEvent);
      } else {
        const oldLastEventEndTime = lastEvent.endTime;

        lastEvent.endTime = event.startTime;

        const newEventOfOverlappingPeriod = new StackableTimelineEvent<TData>(
          event.startTime,
          oldLastEventEndTime - event.startTime,
          lastEvent.data,
          lastEvent.maxStacks,
          newStacksOfOverlappingPeriod
        );
        super.addEvent(newEventOfOverlappingPeriod);

        const newEvent = new StackableTimelineEvent<TData>(
          newEventOfOverlappingPeriod.endTime,
          event.endTime - newEventOfOverlappingPeriod.endTime,
          event.data,
          event.maxStacks,
          event.stacks
        );
        super.addEvent(newEvent);
      }
    } else {
      super.addEvent(event);
    }
  }
}
