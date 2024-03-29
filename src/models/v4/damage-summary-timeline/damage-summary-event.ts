import type { DamageSummary } from '../damage-summary/damage-summary';
import { TimelineEvent } from '../timeline/timeline-event';

export class DamageSummaryEvent extends TimelineEvent {
  public constructor(
    public startTime: number,
    public duration: number,
    public damageSummary: DamageSummary,
    public cumulatedDamageSummary: DamageSummary
  ) {
    super(startTime, duration);

    this.displayName = `${damageSummary.totalDamage.finalDamage}(${damageSummary.totalDamage.baseDamage}) / ${cumulatedDamageSummary.totalDamage.finalDamage}(${cumulatedDamageSummary.totalDamage.baseDamage})`;
  }
}
