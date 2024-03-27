import { fullCharge, maxCharge } from '../../../constants/combat';
import { Timeline } from '../timeline/timeline';
import { ChargeEvent } from './charge-event';

/** Timeline to track how much charge has been cumulated at a point of time. Charges must be added chronologically */
export class ChargeTimeline {
  private readonly timeline: Timeline<ChargeEvent>;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new Timeline(totalDuration);
  }

  /** Cumulated charge at the end of the timeline */
  public get cumulatedCharge() {
    return this.timeline.lastEvent?.cumulatedCharge ?? 0;
  }

  /** Has at least one full charge */
  public get hasFullCharge() {
    return this.cumulatedCharge - fullCharge >= 0;
  }

  public get lastChargeEvent() {
    return this.timeline.lastEvent;
  }

  /** Adds a number of charge units at a point of time. Charges must be added chronologically */
  public addCharge(charge: number, time: number) {
    const event = new ChargeEvent(
      time,
      Math.min(this.cumulatedCharge + charge, maxCharge)
    );
    this.addEvent(event);
  }

  public deductOneFullCharge(time: number) {
    if (!this.hasFullCharge)
      throw new Error(
        'Cannot deduct a full charge when there is no full charge'
      );

    const event = new ChargeEvent(
      time,
      Math.max(this.cumulatedCharge - fullCharge, 0)
    );
    this.addEvent(event);
  }

  public addEvent(event: ChargeEvent) {
    const { lastEvent } = this.timeline;
    if (lastEvent && event.time < lastEvent.time) {
      throw new Error('Charges must be added chronologically');
    }

    this.timeline.addEvent(event);
  }
}
