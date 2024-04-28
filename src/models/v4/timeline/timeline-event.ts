import type { Serializable } from '../../persistable';
import { TimeInterval } from '../time-interval/time-interval';
import type { TimelineEventDto } from './dtos/timeline-event-dto';

export class TimelineEvent
  extends TimeInterval
  implements Serializable<TimelineEventDto>
{
  private _timeInterval: TimeInterval;

  public constructor(timeInterval: TimeInterval) {
    const { startTime, endTime } = timeInterval;
    super(startTime, endTime);

    this._timeInterval = timeInterval;
  }

  public get timeInterval(): TimeInterval {
    return this._timeInterval;
  }
  public set timeInterval(value: TimeInterval) {
    this._timeInterval = value;
    this.startTime = value.startTime;
    this.endTime = value.endTime;
  }

  public get startTime(): number {
    return super.startTime;
  }
  public set startTime(value: number) {
    super.startTime = value;
    this._timeInterval.startTime = value;
  }

  public get endTime(): number {
    return super.endTime;
  }
  public set endTime(value: number) {
    super.endTime = value;
    this._timeInterval.endTime = value;
  }
}
