import { fullCharge, maxCharge } from '../../../constants/combat';
import { Timeline } from '../timeline/timeline';
import { Charge } from './charge';

/** Timeline to track how much charge has been cumulated at a point of time. Charges must be added chronologically */
export class ChargeTimeline {
  private readonly timeline: Timeline<Charge>;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new Timeline(totalDuration);
  }

  /** Cumulated charge at the end of the timeline */
  public get cumulatedCharge() {
    return this.timeline.lastEvent?.cumulatedChargeValue ?? 0;
  }

  /** Has at least one full charge */
  public get hasFullCharge() {
    return this.cumulatedCharge - fullCharge >= 0;
  }

  public get numOfFullCharges(): number {
    return Math.trunc(this.cumulatedCharge / fullCharge);
  }

  public get chargeEvents() {
    return this.timeline.events;
  }

  public get lastChargeEvent() {
    return this.timeline.lastEvent;
  }

  /** Adds a number of charge units at a point of time. Charges must be added chronologically.
   * @returns true if a new full charge is achieved as a result of the charge being added
   */
  public addCharge(
    chargeValue: number,
    startTime: number,
    endTime: number
  ): boolean {
    const oldNumOfFullCharges = this.numOfFullCharges;

    const newChargeValue = Math.min(
      this.cumulatedCharge + chargeValue,
      maxCharge
    );
    this.addEvent(startTime, endTime, newChargeValue);
    const newNumOfFullCharges = this.numOfFullCharges;

    if (newNumOfFullCharges > oldNumOfFullCharges) {
      return true;
    }

    return false;
  }

  public deductOneFullCharge(startTime: number, endTime: number) {
    if (!this.hasFullCharge)
      throw new Error(
        'Cannot deduct a full charge when there is no full charge'
      );

    this.addEvent(
      startTime,
      endTime,
      Math.max(this.cumulatedCharge - fullCharge, 0)
    );
  }

  private addEvent(
    startTime: number,
    endTime: number,
    cumulatedCharge: number
  ) {
    const { lastEvent } = this.timeline;
    if (lastEvent && startTime < lastEvent.endTime) {
      throw new Error('Charges must be added chronologically');
    }

    const event = new Charge(startTime, endTime, cumulatedCharge);
    this.timeline.addEvent(event);
  }
}
