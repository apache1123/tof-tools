import type { Serializable } from '../../persistable';
import type { DamageSummary } from '../damage-summary/damage-summary';
import type { TimeInterval } from '../time-interval/time-interval';
import { TimelineEvent } from '../timeline/timeline-event';
import type { DamageSummaryEventDto } from './dtos/damage-summary-event-dto';

export class DamageSummaryEvent
  extends TimelineEvent
  implements Serializable<DamageSummaryEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    public damageSummary: DamageSummary,
    public cumulatedDamageSummary: DamageSummary,
    /** The total attack of the active weapon recorded at this time interval  */
    public activeWeaponTotalAttack: number
  ) {
    super(timeInterval);
  }

  public toDto(): DamageSummaryEventDto {
    const { cumulatedDamageSummary } = this;
    return {
      ...super.toDto(),
      cumulatedDamageSummary: cumulatedDamageSummary.toDto(),
    };
  }
}
