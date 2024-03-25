import { EffectEvent } from '../timelines/effect-event';
import type { EffectTimeline } from '../timelines/effect-timeline';
import type { EffectDefinition } from './effect-definition';

export class Effect {
  public constructor(
    public readonly effectDefinition: EffectDefinition,
    public readonly timeline: EffectTimeline
  ) {}

  public get id() {
    return this.effectDefinition.id;
  }

  public get displayName() {
    return this.effectDefinition.displayName;
  }

  public trigger(startTime: number, duration: number) {
    const { displayName, cooldown, maxStacks } = this.effectDefinition;

    const effectEvent = new EffectEvent(
      startTime,
      duration,
      cooldown,
      maxStacks
    );
    effectEvent.displayName = displayName;

    this.timeline.addEvent(effectEvent);
  }

  public isActiveAt(time: number) {
    return this.timeline.getEventsOverlapping(time, time).length !== 0;
  }
}
