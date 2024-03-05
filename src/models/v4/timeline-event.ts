export class TimelineEvent {
  public constructor(
    /** in ms */
    public readonly startTime: number,
    /** in ms */
    public readonly duration: number
  ) {}

  /** in ms */
  public get endTime() {
    return this.startTime + this.duration;
  }
}
