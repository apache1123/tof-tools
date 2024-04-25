import { TimeInterval } from '../time-interval';

/** An action is anything a character does, spanning over a time interval and has a cooldown. Attacks and buffs are all considered actions. */
export class Action extends TimeInterval {
  private _timeInterval: TimeInterval;

  public constructor(timeInterval: TimeInterval, public cooldown: number) {
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

  /** Cooldown ends at a point of time (exclusive) */
  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
