import { TimelineEvent } from '../timeline/timeline-event';

export class ChargeEvent extends TimelineEvent {
  public constructor(
    public startTime: number,
    public duration: number,
    public cumulatedCharge: number
  ) {
    super(startTime, duration);

    this.displayName = cumulatedCharge.toString();
  }
}
