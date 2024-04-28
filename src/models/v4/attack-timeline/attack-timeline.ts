import type { Serializable } from '../../persistable';
import { AbilityTimeline } from '../ability-timeline/ability-timeline';
import type { AttackEvent } from './attack-event';
import type { AttackTimelineDto } from './dtos/attack-timeline-dto';

export class AttackTimeline
  extends AbilityTimeline<AttackEvent>
  implements Serializable<AttackTimelineDto>
{
  /** Adds a new attack event. The new attack's start time cannot be earlier than the start time of the existing last attack. If the new attack overlaps with the previous, the previous one is cut short at the point where the new one is added. Attacks should be checked for cooldown before being added */
  public addAttackEvent(attack: AttackEvent) {
    if (this.lastEvent && attack.startTime < this.lastEvent?.endTime) {
      this.lastEvent.endTime = attack.startTime;
      if (this.lastEvent.startTime === this.lastEvent.endTime) {
        this.removeEvent(this.lastEvent);
      }
    }

    this.addEvent(attack);
  }
}
