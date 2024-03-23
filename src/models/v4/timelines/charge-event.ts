import { TimelineEvent } from './timeline-event';

export class ChargeEvent extends TimelineEvent {
  public constructor(public time: number, public cumulatedCharge: number) {
    super(time, 0);
  }

  public get displayName(): string {
    return this.cumulatedCharge.toString();
  }
}
