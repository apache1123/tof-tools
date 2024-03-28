import type { TimelineEvent } from './timeline-event';

export class Timeline<TEvent extends TimelineEvent> {
  private readonly _events: TEvent[] = [];

  public constructor(public readonly totalDuration: number) {}

  public get events(): ReadonlyArray<TEvent> {
    return this._events;
  }

  public get lastEvent(): TEvent | undefined {
    return this.events[this.events.length - 1];
  }

  public addEvent(event: TEvent) {
    if (event.startTime >= this.totalDuration) {
      throw new Error(
        "Cannot add event that starts after the timeline's duration"
      );
    }

    if (this.lastEvent && event.startTime < this.lastEvent.startTime) {
      throw new Error(
        'Cannot add an event that is earlier than the latest event'
      );
    }

    // Cut off event if it goes past the timeline duration
    if (event.endTime > this.totalDuration) {
      event.endTime = this.totalDuration;
    }

    this._events.push(event);
  }

  /** Returns events that start between the start and end time, inclusive */
  public getEventsBetween(startTime: number, endTime: number): TEvent[] {
    return this._events.filter(
      (event) => event.startTime >= startTime && event.startTime <= endTime
    );
  }

  /** Returns events that have any sort of overlap with the period of start time to end time. */
  public getEventsOverlappingPeriod(
    startTime: number,
    endTime: number
  ): TEvent[] {
    if (startTime === endTime) {
      return this.getEventsOverlappingTime(startTime);
    }

    return this._events.filter(
      (event) => event.startTime < endTime && event.endTime >= startTime
    );
  }

  public getEventsOverlappingTime(time: number) {
    return this._events.filter(
      (event) => event.startTime <= time && event.endTime > time
    );
  }
}
