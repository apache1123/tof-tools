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

  public get chargeEvents() {
    return this.timeline.events;
  }

  public get lastChargeEvent() {
    return this.timeline.lastEvent;
  }

  /** Adds a number of charge units at a point of time. Charges must be added chronologically */
  public addCharge(charge: number, startTime: number, duration: number) {
    this.addEvent(
      startTime,
      duration,
      Math.min(this.cumulatedCharge + charge, maxCharge)
    );
  }

  public deductOneFullCharge(startTime: number, duration: number) {
    if (!this.hasFullCharge)
      throw new Error(
        'Cannot deduct a full charge when there is no full charge'
      );

    this.addEvent(
      startTime,
      duration,
      Math.max(this.cumulatedCharge - fullCharge, 0)
    );
  }

  private addEvent(
    startTime: number,
    duration: number,
    cumulatedCharge: number
  ) {
    const { lastEvent } = this.timeline;
    if (lastEvent && startTime < lastEvent.endTime) {
      throw new Error('Charges must be added chronologically');
    }

    const event = new ChargeEvent(startTime, duration, cumulatedCharge);
    this.timeline.addEvent(event);
  }
}
