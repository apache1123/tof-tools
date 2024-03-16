import type { Attack } from './attack';
import type { TimelineEventData } from './timeline/timeline-event-data';

export class AttackEventData implements TimelineEventData {
  public constructor(public readonly attack: Attack) {}

  public get displayName(): string {
    return this.attack.attackDefinition.displayName;
  }
}
