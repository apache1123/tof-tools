import { BuffEvent } from './buff-event';
import { Timeline } from './timeline';

/** Buff timeline where events can have "stacks" e.g. a damage buff could have 2 stacks of "+10%". Events will still be linear/chronological, however. Adding an event that overlaps with an existing event will increase the "stack" over the overlapping time period, if possible. Assuming all events are the same "type", and are all stackable with each other */
export class BuffTimeline extends Timeline<BuffEvent> {
  /** Adds an event to the end of the timeline. The new event can overlap with the last existing event in the timeline, but cannot be before it.
   *
   * If there is an overlapping existing event, increase its stack count by the number of stacks in the new event, up to the max stack count. If the resulting stack count of the existing event is the same as the new event, simply "merge" the two events by increasing the duration of the existing event. */
  public addEvent(event: BuffEvent) {
    const { lastEvent } = this;

    // Event does not overlap with an existing one, add new event as usual
    if (!lastEvent || event.startTime >= lastEvent.endTime) {
      super.addEvent(event);
      return;
    }

    if (event.startTime < lastEvent.startTime) {
      throw new Error(
        'Cannot add an event that is earlier than the latest event'
      );
    }

    // Same time period, increase stack count if applicable
    if (
      event.startTime === lastEvent.startTime &&
      event.endTime === lastEvent.endTime
    ) {
      const newStacksCount = Math.min(
        lastEvent.stacks + event.stacks,
        lastEvent.maxStacks
      );

      if (newStacksCount !== lastEvent.stacks) {
        lastEvent.stacks = newStacksCount;
      }

      return;
    }

    // Time periods overlap, but are not the same
    const newStacksOfOverlappingPeriod = Math.min(
      lastEvent.stacks + event.stacks,
      lastEvent.maxStacks
    );

    if (newStacksOfOverlappingPeriod === event.stacks) {
      lastEvent.endTime = event.endTime;
      return;
    }

    if (newStacksOfOverlappingPeriod === lastEvent.stacks) {
      const newEvent = new BuffEvent(
        lastEvent.endTime,
        event.duration,
        event.buffDefinition,
        event.maxStacks,
        event.stacks
      );
      super.addEvent(newEvent);
      return;
    }

    const oldLastEventEndTime = lastEvent.endTime;

    lastEvent.endTime = event.startTime;

    const newEventOfOverlappingPeriod = new BuffEvent(
      event.startTime,
      oldLastEventEndTime - event.startTime,
      lastEvent.buffDefinition,
      lastEvent.maxStacks,
      newStacksOfOverlappingPeriod
    );
    super.addEvent(newEventOfOverlappingPeriod);

    const newEvent = new BuffEvent(
      newEventOfOverlappingPeriod.endTime,
      event.endTime - newEventOfOverlappingPeriod.endTime,
      event.buffDefinition,
      event.maxStacks,
      event.stacks
    );
    super.addEvent(newEvent);
  }
}
