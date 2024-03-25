import { EffectEvent } from './effect-event';
import { Timeline } from './timeline';

/** Effect timeline where events can have "stacks" e.g. a damage buff event could have 2 stacks of "+10%". Events will still be linear/chronological, however. Adding an event that overlaps with an existing event will increase the "stack" over the overlapping time period, if possible. Assuming all events are the same "type", and are all stackable with each other */
export class EffectTimeline extends Timeline<EffectEvent> {
  /** Adds an event to the end of the timeline. The new event can overlap with the last existing event in the timeline, but cannot be before it.
   *
   * If there is an overlapping existing event, increase its stack count by the number of stacks in the new event, up to the max stack count. If the resulting stack count of the existing event is the same as the new event, simply "merge" the two events by increasing the duration of the existing event. */
  public addEvent(event: EffectEvent) {
    // TODO: this method is awkward, feels like it shouldn't belong here
    const { lastEvent } = this;

    // Last event still on cooldown
    if (lastEvent && lastEvent.cooldownEndsAt > event.startTime) {
      return;
    }

    // Event does not overlap with an existing one whatsoever, add new event as usual
    if (!lastEvent || event.startTime > lastEvent.endTime) {
      super.addEvent(event);
      return;
    }

    // Event starts when the previous one ends - Merge the two of they have the same number of stacks, or add a new one if not
    if (event.startTime === lastEvent.endTime) {
      if (event.stacks === lastEvent.stacks) {
        lastEvent.endTime = event.endTime;
      } else {
        super.addEvent(event);
      }
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
      const newEvent = new EffectEvent(
        lastEvent.endTime,
        event.duration,
        event.cooldown,
        event.maxStacks,
        event.stacks
      );
      super.addEvent(newEvent);
      return;
    }

    const oldLastEventEndTime = lastEvent.endTime;

    lastEvent.endTime = event.startTime;

    const newEventOfOverlappingPeriod = new EffectEvent(
      event.startTime,
      oldLastEventEndTime - event.startTime,
      lastEvent.cooldown,
      lastEvent.maxStacks,
      newStacksOfOverlappingPeriod
    );
    super.addEvent(newEventOfOverlappingPeriod);

    const newEvent = new EffectEvent(
      newEventOfOverlappingPeriod.endTime,
      event.endTime - newEventOfOverlappingPeriod.endTime,
      event.cooldown,
      event.maxStacks,
      event.stacks
    );
    super.addEvent(newEvent);
  }
}
