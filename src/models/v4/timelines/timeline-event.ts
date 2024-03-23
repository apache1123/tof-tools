export class TimelineEvent {
  public constructor(
    /** in ms */
    public startTime: number,
    /** in ms */
    public duration: number
  ) {}

  /** in ms */
  public get endTime() {
    return this.startTime + this.duration;
  }
  public set endTime(value: number) {
    if (this.endTime <= this.startTime) {
      throw new Error('End time cannot be earlier than start time');
    }
    this.duration = value - this.startTime;
  }

  public get displayName() {
    return '';
  }
}
