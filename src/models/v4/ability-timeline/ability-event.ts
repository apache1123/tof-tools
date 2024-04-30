import type { Serializable } from '../../persistable';
import type { TimeInterval } from '../time-interval/time-interval';
import { TimelineEvent } from '../timeline/timeline-event';
import type { AbilityEventDto } from './dtos/ability-event-dto';

/** An ability event is produced when that ability is performed, spanning over a time interval and has a cooldown etc.  */
export class AbilityEvent
  extends TimelineEvent
  implements Serializable<AbilityEventDto>
{
  public cooldown: number;

  public constructor(timeInterval: TimeInterval, cooldown: number) {
    super(timeInterval);
    this.cooldown = cooldown;
  }

  /** Cooldown ends at a point of time (exclusive) */
  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
