import type { TimelineEventData } from './timeline-event-data';

export class TimelineEvent<T extends TimelineEventData> {
  public constructor(
    /** in ms */
    public startTime: number,
    /** in ms */
    public duration: number,
    public data: T
  ) {}

  /** in ms */
  public get endTime() {
    return this.startTime + this.duration;
  }
  public set endTime(value: number) {
    if (this.endTime <= this.startTime) {
      throw new Error('End time cannot be earlier than start time');
    }
    this.duration = value - this.startTime;
  }
}

// export type ReadonlyTimelineEvent<TData> = Readonly<TimelineEvent<TData>>;
