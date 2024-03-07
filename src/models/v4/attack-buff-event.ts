import type { AttackBuffDefinition } from './attack-buff-definition';
import { TimelineEvent } from './timeline-event';

export class AttackBuffEvent extends TimelineEvent {
  public constructor(
    public readonly startTime: number,
    public readonly duration: number,
    public readonly attackBuffDefinition: AttackBuffDefinition,
    public readonly stacks = 1
  ) {
    super(startTime, duration);
  }
}
