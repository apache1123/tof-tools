import type { EffectDefinition } from '../effect-definition';
import { TimelineEvent } from './timeline-event';

export class EffectEvent extends TimelineEvent {
  public cooldown: number;

  public constructor(
    public startTime: number,
    public duration: number,
    public effectDefinition: EffectDefinition,
    public maxStacks: number = 1,
    public stacks: number = 1
  ) {
    super(startTime, duration);

    this.cooldown = effectDefinition.cooldown;
  }

  public get displayName(): string {
    return this.effectDefinition.displayName;
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
