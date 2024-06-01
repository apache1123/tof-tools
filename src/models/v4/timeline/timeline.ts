import { getLatestTimeInterval } from '../../../utils/time-interval-utils';
import type { Serializable } from '../../persistable';
import type { TimeInterval } from '../time-interval/time-interval';
import type { TimelineDto } from './dtos/timeline-dto';
import type { TimelineEvent } from './timeline-event';

export class Timeline<T extends TimelineEvent>
  implements Serializable<TimelineDto>
{
  private readonly _events: T[] = [];

  public constructor(public readonly totalDuration: number) {}

  public get events(): ReadonlyArray<T> {
    return this._events;
  }

  public get lastEvent(): T | undefined {
    return this.events[this.events.length - 1];
  }

  public addEvent(event: T) {
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

  /** Returns events that have any sort of overlap with the interval of start time to end time. */
  public getEventsOverlappingInterval(startTime: number, endTime: number): T[] {
    if (startTime === endTime) {
      return this.getEventsOverlappingTime(startTime);
    }

    return this._events.filter(
      (event) =>
        (event.startTime < endTime && event.endTime > startTime) ||
        (event.startTime === event.endTime &&
          event.startTime >= startTime &&
          event.startTime < endTime)
    );
  }

  public hasEventAt(time: number) {
    return this.getEventsOverlappingTime(time).length !== 0;
  }

  public getEventsOverlappingTime(time: number) {
    return this._events.filter(
      (event) => event.startTime <= time && event.endTime > time
    );
  }

  public getEventsEndingBetween(timeInterval: TimeInterval) {
    return this._events.filter(
      (event) =>
        event.endTime > timeInterval.startTime &&
        event.endTime <= timeInterval.endTime
    );
  }

  /** Gets the latest event that ends before the specified time */
  public getLatestEventBefore(time: number): T | undefined {
    const eventsBefore = this._events.filter((event) => event.endTime <= time);
    if (!eventsBefore.length) return undefined;

    return getLatestTimeInterval(eventsBefore);
  }

  public removeEvent(event: T) {
    const index = this._events.indexOf(event);
    if (index !== -1) {
      this._events.splice(index, 1);
    }
  }

  public toDto(): TimelineDto {
    const { events } = this;
    return { events: events.map((event) => event.toDto()), version: 1 };
  }
}
