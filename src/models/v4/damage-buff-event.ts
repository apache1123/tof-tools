import type { DamageBuffDefinition } from './damage-buff-definition';
import { TimelineEvent } from './timeline-event';

export class DamageBuffEvent extends TimelineEvent {
  public constructor(
    public readonly startTime: number,
    public readonly duration: number,
    public readonly damageBuffDefinition: DamageBuffDefinition,
    public readonly stacks = 1
  ) {
    super(startTime, duration);
  }
}
