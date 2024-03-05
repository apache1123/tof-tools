import type { TimelineEvent } from './timeline-event';

export class Timeline<T extends TimelineEvent> {
  protected readonly _events: T[] = [];

  public get events(): ReadonlyArray<T> {
    return this._events;
  }

  public get lastEvent(): T | undefined {
    return this.events[this.events.length - 1];
  }

  public get nextEarliestStartTime(): number {
    return this.lastEvent?.endTime ?? 0;
  }

  public addEvent(event: T) {
    if (event.startTime < this.nextEarliestStartTime) {
      throw new Error('Invalid startTime when adding a new TimelineEvent');
    }

    this._events.push(event);
  }

  /** Returns events that start between the start and end time, inclusive */
  public getEventsBetween(startTime: number, endTime: number) {
    return this._events.filter(
      (event) => event.startTime >= startTime && event.startTime <= endTime
    );
  }
}
