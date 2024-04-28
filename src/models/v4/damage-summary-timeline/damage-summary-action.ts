import type { Serializable } from '../../persistable';
import type { DamageSummary } from '../damage-summary/damage-summary';
import type { TimeInterval } from '../time-interval/time-interval';
import { TimelineAction } from '../timeline/timeline-action';
import type { DamageSummaryActionDto } from './dtos/damage-summary-action-dto';

export class DamageSummaryAction
  extends TimelineAction
  implements Serializable<DamageSummaryActionDto>
{
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

  public toDto(): DamageSummaryActionDto {
    const { cumulatedDamageSummary } = this;
    return {
      ...super.toDto(),
      cumulatedDamageSummary: cumulatedDamageSummary.toDto(),
    };
  }
}
