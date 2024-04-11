import type { DamageSummary } from '../damage-summary/damage-summary';
import type { TimePeriod } from '../time-period';
import { TimelineEvent } from '../timeline/timeline-event';

export class DamageSummaryEvent extends TimelineEvent {
  public constructor(
    timePeriod: TimePeriod,
    public damageSummary: DamageSummary,
    public cumulatedDamageSummary: DamageSummary
  ) {
    const { startTime, endTime } = timePeriod;
    super(startTime, endTime);
  }
}
