import type { DamageSummary } from '../damage-summary/damage-summary';
import { TimePeriod } from '../time-period';
import { Timeline } from '../timeline/timeline';
import { DamageSummaryEvent } from './damage-summary-event';

/** Timeline to track how much damage has been cumulated at a point of time */
export class DamageSummaryTimeline {
  private readonly timeline: Timeline<DamageSummaryEvent>;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new Timeline(totalDuration);
  }

  public get damageSummaryEvents() {
    return this.timeline.actions;
  }

  public get lastDamageSummaryEvent() {
    return this.timeline.lastAction;
  }

  public get cumulatedDamageSummary() {
    return this.timeline.lastAction?.cumulatedDamageSummary;
  }

  public addDamageSummary(
    damageSummary: DamageSummary,
    startTime: number,
    duration: number
  ) {
    const { lastAction: lastEvent } = this.timeline;
    if (lastEvent && startTime < lastEvent.endTime) {
      throw new Error('DamageSummaries must be added chronologically');
    }

    const timePeriod = new TimePeriod(startTime, startTime + duration);
    this.timeline.addAction(
      new DamageSummaryEvent(
        timePeriod,
        damageSummary,
        this.cumulatedDamageSummary?.add(damageSummary) ?? damageSummary
      )
    );
  }
}
