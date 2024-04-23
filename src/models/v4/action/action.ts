import { TimePeriod } from '../time-period';

/** An action is anything a character does, spanning over a time period and has a cooldown. Attacks and buffs are all considered actions. */
export class Action extends TimePeriod {
  private _timePeriod: TimePeriod;

  public constructor(timePeriod: TimePeriod, public cooldown: number) {
    const { startTime, endTime } = timePeriod;
    super(startTime, endTime);

    this._timePeriod = timePeriod;
  }

  public get timePeriod(): TimePeriod {
    return this._timePeriod;
  }
  public set timePeriod(value: TimePeriod) {
    this._timePeriod = value;
    this.startTime = value.startTime;
    this.endTime = value.endTime;
  }

  public get startTime(): number {
    return super.startTime;
  }
  public set startTime(value: number) {
    super.startTime = value;
    this._timePeriod.startTime = value;
  }

  public get endTime(): number {
    return super.endTime;
  }
  public set endTime(value: number) {
    super.endTime = value;
    this._timePeriod.endTime = value;
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
