import { TimelineEvent } from './timeline-event';

export class EffectEvent extends TimelineEvent {
  public constructor(
    public startTime: number,
    public duration: number,
    public cooldown: number,
    public maxStacks: number = 1,
    public stacks: number = 1
  ) {
    super(startTime, duration);
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
