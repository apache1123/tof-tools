export class TimePeriod {
  private _startTime: number;
  private _endTime: number;

  public constructor(startTime: number, endTime: number) {
    if (endTime < startTime) {
      throw new Error('End time cannot be earlier than start time');
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

  public get endTime(): number {
    return this._endTime;
  }
  public set endTime(value: number) {
    if (value < this._startTime) {
      throw new Error('End time cannot be earlier than start time');
    }
    this._endTime = value;
  }

  public get duration(): number {
    return this._endTime - this._startTime;
  }
}
