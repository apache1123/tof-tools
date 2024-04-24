import type { DamageSummary } from '../damage-summary/damage-summary';
import type { TimeInterval } from '../time-interval';
import { TimelineAction } from '../timeline/timeline-action';

export class DamageSummaryEvent extends TimelineAction {
  public constructor(
    timeInterval: TimeInterval,
    public damageSummary: DamageSummary,
    public cumulatedDamageSummary: DamageSummary
  ) {
    const { startTime, endTime } = timeInterval;
    super(startTime, endTime);
  }
}
