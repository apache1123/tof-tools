import type { Attack } from './attack';
import { TimelineEvent } from './timeline-event';

export class AttackEvent extends TimelineEvent {
  public constructor(
    public readonly attack: Attack,
    /** in ms */
    public readonly startTime: number
  ) {
    super(startTime, attack.attackDefinition.duration);
  }
}
