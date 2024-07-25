import type { Serializable } from '../../persistable';
import { Timeline } from '../timeline/timeline';
import type { AbilityEvent } from './ability-event';
import type { AbilityTimelineDto } from './dtos/ability-timeline-dto';

export class AbilityTimeline<T extends AbilityEvent = AbilityEvent>
  extends Timeline<T>
  implements Serializable<AbilityTimelineDto>
{
  public hasEventOnCooldownAt(time: number) {
    return this.events.some((event) => event.isOnCooldown(time));
  }
}
