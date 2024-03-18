import type { BuffDefinition } from '../buffs/buff-definition';
import { TimelineEvent } from './timeline-event';

export class BuffEvent extends TimelineEvent {
  public constructor(
    public startTime: number,
    public duration: number,
    public buffDefinition: BuffDefinition,
    public maxStacks: number = 1,
    public stacks: number = 1
  ) {
    super(startTime, duration);
  }

  public get displayName(): string {
    return this.buffDefinition.displayName;
  }
}
