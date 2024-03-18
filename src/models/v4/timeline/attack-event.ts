import type { Attack } from '../attack';
import { TimelineEvent } from './timeline-event';

export class AttackEvent extends TimelineEvent {
  public constructor(public startTime: number, public attack: Attack) {
    super(startTime, attack.attackDefinition.duration);
  }

  public get displayName() {
    return this.attack.attackDefinition.displayName;
  }
}
