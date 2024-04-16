import type { DamageSummary } from '../damage-summary/damage-summary';
import type { TimePeriod } from '../time-period';
import { TimelineAction } from '../timeline/timeline-action';

export class DamageSummaryEvent extends TimelineAction {
  public constructor(
    timePeriod: TimePeriod,
    public damageSummary: DamageSummary,
    public cumulatedDamageSummary: DamageSummary
  ) {
    const { startTime, endTime } = timePeriod;
    super(startTime, endTime);
  }
}
