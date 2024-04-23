import { ActionTimeline } from '../action/action-timeline';
import type { AttackAction } from './attack-action';

export class AttackTimeline extends ActionTimeline<AttackAction> {
  /** Adds a new attack action. The new attack's start time cannot be earlier than the start time of the existing last attack. If the new attack overlaps with the previous, the previous one is cut short at the point where the new one is added. Attacks should be checked for cooldown before being added */
  public addAttackAction(attack: AttackAction) {
    if (this.lastAction && attack.startTime < this.lastAction?.endTime) {
      this.lastAction.endTime = attack.startTime;
      if (this.lastAction.startTime === this.lastAction.endTime) {
        this.removeAction(this.lastAction);
      }
    }

    this.addAction(attack);
  }
}
