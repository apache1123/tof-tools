import { TimelineEvent } from './timeline-event';
import type { TimelineEventData } from './timeline-event-data';

export class StackableTimelineEvent<
  T extends TimelineEventData
> extends TimelineEvent<T> {
  public constructor(
    public startTime: number,
    public duration: number,
    public data: T,
    public maxStacks: number = 1,
    public stacks: number = 1
  ) {
    super(startTime, duration, data);
  }
}
