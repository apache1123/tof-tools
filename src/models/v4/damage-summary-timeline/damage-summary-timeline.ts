import type { DamageSummary } from '../damage-summary/damage-summary';
import type { TimeInterval } from '../time-interval';
import { Timeline } from '../timeline/timeline';
import { DamageSummaryAction } from './damage-summary-action';

/** Timeline to track how much damage has been cumulated at a point of time */
export class DamageSummaryTimeline {
  private readonly timeline: Timeline<DamageSummaryAction>;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new Timeline(totalDuration);
  }

  public get damageSummaryActions() {
    return this.timeline.actions;
  }

  public get lastDamageSummaryAction() {
    return this.timeline.lastAction;
  }

  public get lastCumulatedDamageSummary() {
    return this.timeline.lastAction?.cumulatedDamageSummary;
  }

  /** Gets the latest damage summary event before the specified time */
  public getDamageSummaryAction(time: number) {
    return this.timeline.getLatestActionBefore(time);
  }

  public addDamageSummary(
    timeInterval: TimeInterval,
    damageSummary: DamageSummary,
    activeWeaponTotalAttack: number
  ) {
    const { lastAction: lastEvent } = this.timeline;
    if (lastEvent && timeInterval.startTime < lastEvent.endTime) {
      throw new Error('DamageSummaries must be added chronologically');
    }

    this.timeline.addAction(
      new DamageSummaryAction(
        timeInterval,
        damageSummary,
        this.lastCumulatedDamageSummary?.add(damageSummary) ?? damageSummary,
        activeWeaponTotalAttack
      )
    );
  }
}
