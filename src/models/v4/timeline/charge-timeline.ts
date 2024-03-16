import { fullCharge, maxCharge } from '../../../constants/combat';
import type { ChargeTimelineEvent } from './charge-timeline-event';

/** Timeline to track how much charge has been cumulated at a point of time. Charges must be added chronologically */
export class ChargeTimeline {
  private readonly _events: ChargeTimelineEvent[] = [];

  public get events(): ReadonlyArray<ChargeTimelineEvent> {
    return this._events;
  }

  public get lastEvent(): ChargeTimelineEvent | undefined {
    return this.events[this.events.length - 1];
  }

  /** Cumulated charge at the end of the timeline */
  public get cumulatedCharge() {
    return this.lastEvent?.cumulatedCharge ?? 0;
  }

  /** Has at least one full charge */
  public get hasFullCharge() {
    return this.cumulatedCharge - fullCharge >= 0;
  }

  /** Adds a number of charge units at a point of time. Charges must be added chronologically */
  public addCharge(charge: number, time: number) {
    const event: ChargeTimelineEvent = {
      time,
      cumulatedCharge: Math.min(this.cumulatedCharge + charge, maxCharge),
    };

    this.addEvent(event);
  }

  public deductOneFullCharge(time: number) {
    if (!this.hasFullCharge)
      throw new Error(
        'Cannot deduct a full charge when there is no full charge'
      );

    const event: ChargeTimelineEvent = {
      time,
      cumulatedCharge: Math.max(this.cumulatedCharge - fullCharge, 0),
    };

    this.addEvent(event);
  }

  private addEvent(event: ChargeTimelineEvent) {
    const { lastEvent } = this;
    if (lastEvent && event.time < lastEvent.time) {
      throw new Error('Charges must be added chronologically');
    }

    this._events.push(event);
  }
}
