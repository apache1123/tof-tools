import { ActionTimeline } from '../action/action-timeline';
import type { Attack } from './attack';

export class AttackTimeline extends ActionTimeline<Attack> {
  /** Adds a new attack. The new attack's start time cannot be earlier than the start time of the existing last attack. If the new attack overlaps with the previous, the previous one is cut short at the point where the new one is added. Attacks should be checked for cooldown before being added */
  public addAttack(attack: Attack) {
    if (this.lastEvent && attack.startTime < this.lastEvent?.endTime) {
      this.lastEvent.endTime = attack.startTime;
    }

    this.addEvent(attack);
  }
}
