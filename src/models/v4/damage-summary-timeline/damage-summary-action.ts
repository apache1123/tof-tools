import type { DamageSummary } from '../damage-summary/damage-summary';
import type { TimeInterval } from '../time-interval';
import { TimelineAction } from '../timeline/timeline-action';

export class DamageSummaryAction extends TimelineAction {
  public constructor(
    timeInterval: TimeInterval,
    public damageSummary: DamageSummary,
    public cumulatedDamageSummary: DamageSummary,
    /** The total attack recorded at this time interval  */
    public activeWeaponTotalAttack: number
  ) {
    const { startTime, endTime } = timeInterval;
    super(startTime, endTime);
  }
}
