import type { TimelineEvent } from './timeline-event';

export class Timeline<TEvent extends TimelineEvent> {
  protected readonly _events: TEvent[] = [];

  public get events(): ReadonlyArray<TEvent> {
    return this._events;
  }

  public get lastEvent(): TEvent | undefined {
    return this.events[this.events.length - 1];
  }

  public addEvent(event: TEvent) {
    this._events.push(event);
  }

  /** Returns events that start between the start and end time, inclusive */
  public getEventsBetween(startTime: number, endTime: number): TEvent[] {
    return this._events.filter(
      (event) => event.startTime >= startTime && event.startTime <= endTime
    );
  }

  /** Returns events that have any sort of overlap with the period of start time to end time */
  public getEventsOverlapping(startTime: number, endTime: number): TEvent[] {
    return this._events.filter(
      (event) =>
        (event.endTime > startTime && event.endTime <= endTime) ||
        (event.startTime >= startTime && event.startTime < endTime)
    );
  }
}
