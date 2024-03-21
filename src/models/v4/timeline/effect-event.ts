import type { EffectDefinition } from '../effect-definition';
import { TimelineEvent } from './timeline-event';

export class EffectEvent extends TimelineEvent {
  public constructor(
    public startTime: number,
    public duration: number,
    public effectDefinition: EffectDefinition,
    public maxStacks: number = 1,
    public stacks: number = 1
  ) {
    super(startTime, duration);
  }

  public get displayName(): string {
    return this.effectDefinition.displayName;
  }
}
