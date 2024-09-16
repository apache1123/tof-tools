import type { Serializable } from '../../persistable';
import type { TimeIntervalDto } from './dtos/time-interval-dto';

/** A time interval defined by two instant points of time.
 *
 * The start time instant is inclusive and the end time instant is exclusive. i.e. [startTime, endTime) */
export class TimeInterval implements Serializable<TimeIntervalDto> {
  private _startTime: number;
  private _endTime: number;

  /**
   * @param startTime Starting instant of time (inclusive)
   * @param endTime Ending instant of time (exclusive)
   */
  public constructor(startTime: number, endTime: number) {
    if (endTime < startTime) {
      throw new Error('End time cannot be earlier than start time');
    }

    if (endTime === startTime) {
      throw new Error('End time cannot be the same as start time');
    }

    this._startTime = startTime;
    this._endTime = endTime;
  }

  public get startTime(): number {
    return this._startTime;
  }
  public set startTime(value: number) {
    if (value > this._endTime) {
      throw new Error('Start time cannot be later than end time');
    }
    this._startTime = value;
  }

  /** Ending instant of time (exclusive) */
  public get endTime(): number {
    return this._endTime;
  }
  public set endTime(value: number) {
    if (value <= this._startTime) {
      throw new Error(
        'End time cannot be earlier than, or the same as, the start time'
      );
    }
    this._endTime = value;
  }

  /** Ending instant of time (inclusive) */
  public get endTimeInclusive(): number {
    return this.endTime - 1;
  }

  public get duration(): number {
    return this._endTime - this._startTime;
  }

  /** Determines whether a time lies in this time interval (startTime <= time < endTime) */
  public includes(time: number) {
    return time >= this._startTime && time < this._endTime;
  }

  public toDto(): TimeIntervalDto {
    const { startTime, endTime, duration } = this;
    return { startTime, endTime, duration, version: 1 };
  }
}
