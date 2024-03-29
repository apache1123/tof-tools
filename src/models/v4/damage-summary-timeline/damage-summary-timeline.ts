import type { DamageSummary } from '../damage-summary/damage-summary';
import { Timeline } from '../timeline/timeline';
import { DamageSummaryEvent } from './damage-summary-event';

/** Timeline to track how much damage has been cumulated at a point of time */
export class DamageSummaryTimeline {
  private readonly timeline: Timeline<DamageSummaryEvent>;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new Timeline(totalDuration);
  }

  public get damageSummaryEvents() {
    return this.timeline.events;
  }

  public get lastDamageSummaryEvent() {
    return this.timeline.lastEvent;
  }

  public get cumulatedDamageSummary() {
    return this.timeline.lastEvent?.cumulatedDamageSummary;
  }

  public addDamageSummary(
    damageSummary: DamageSummary,
    startTime: number,
    duration: number
  ) {
    const { lastEvent } = this.timeline;
    if (lastEvent && startTime < lastEvent.endTime) {
      throw new Error('DamageSummaries must be added chronologically');
    }

    this.timeline.addEvent(
      new DamageSummaryEvent(
        startTime,
        duration,
        damageSummary,
        this.cumulatedDamageSummary?.add(damageSummary) ?? damageSummary
      )
    );
  }
}
