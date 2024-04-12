import { TimelineEvent } from '../timeline/timeline-event';

export class Charge extends TimelineEvent {
  public constructor(
    startTime: number,
    endTime: number,
    public cumulatedChargeValue: number
  ) {
    super(startTime, endTime);
  }
}
