import type { Serializable } from "../../persistable";
import type { TimeInterval } from "../time-interval/time-interval";
import type { TimelineEventDto } from "./dtos/timeline-event-dto";

export class TimelineEvent implements Serializable<TimelineEventDto> {
  private readonly _timeInterval: TimeInterval;

  public constructor(timeInterval: TimeInterval) {
    this._timeInterval = timeInterval;
  }

  public get timeInterval(): TimeInterval {
    return this._timeInterval;
  }

  public get startTime(): number {
    return this._timeInterval.startTime;
  }
  public set startTime(value: number) {
    this._timeInterval.startTime = value;
  }

  /** Ending instant of time (exclusive) */
  public get endTime(): number {
    return this._timeInterval.endTime;
  }
  public set endTime(value: number) {
    this._timeInterval.endTime = value;
  }

  /** Ending instant of time (inclusive) */
  public get endTimeInclusive(): number {
    return this._timeInterval.endTimeInclusive;
  }

  public get duration(): number {
    return this._timeInterval.duration;
  }

  public toDto(): TimelineEventDto {
    const { startTime, endTime, duration } = this;
    return { startTime, endTime, duration, version: 1 };
  }
}
