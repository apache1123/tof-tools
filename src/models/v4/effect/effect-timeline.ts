import { Timeline } from '../timeline/timeline';
import { Effect } from './effect';

export class EffectTimeline {
  private readonly timeline: Timeline<Effect>;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new Timeline(totalDuration);
  }

  public get effects(): readonly Effect[] {
    return this.timeline.events;
  }

  public get lastEffect() {
    return this.timeline.lastEvent;
  }

  public addEffect(effect: Effect) {
    const { lastEffect } = this;

    // Event does not overlap with an existing one whatsoever, add new event as usual
    if (!lastEffect || effect.startTime > lastEffect.endTime) {
      this.timeline.addEvent(effect);
      return;
    }

    // Event starts when the previous one ends - Merge the two of they have the same number of stacks, or add a new one if not
    if (effect.startTime === lastEffect.endTime) {
      if (effect.stacks === lastEffect.stacks) {
        lastEffect.endTime = effect.endTime;
      } else {
        this.timeline.addEvent(effect);
      }
      return;
    }

    // Same time period, increase stack count if applicable
    if (
      effect.startTime === lastEffect.startTime &&
      effect.endTime === lastEffect.endTime
    ) {
      const newStacksCount = Math.min(
        lastEffect.stacks + effect.stacks,
        lastEffect.maxStacks
      );

      if (newStacksCount !== lastEffect.stacks) {
        lastEffect.stacks = newStacksCount;
      }

      return;
    }

    // Time periods overlap, but are not the same
    const newStacksOfOverlappingPeriod = Math.min(
      lastEffect.stacks + effect.stacks,
      lastEffect.maxStacks
    );

    if (newStacksOfOverlappingPeriod === effect.stacks) {
      lastEffect.endTime = effect.endTime;
      return;
    }

    if (newStacksOfOverlappingPeriod === lastEffect.stacks) {
      const newEvent = new Effect(
        lastEffect.endTime,
        effect.duration,
        effect.cooldown,
        effect.maxStacks,
        effect.stacks
      );
      this.timeline.addEvent(newEvent);
      return;
    }

    const oldLastEventEndTime = lastEffect.endTime;

    lastEffect.endTime = effect.startTime;

    const newEventOfOverlappingPeriod = new Effect(
      effect.startTime,
      oldLastEventEndTime - effect.startTime,
      lastEffect.cooldown,
      lastEffect.maxStacks,
      newStacksOfOverlappingPeriod
    );
    this.timeline.addEvent(newEventOfOverlappingPeriod);

    const newEvent = new Effect(
      newEventOfOverlappingPeriod.endTime,
      effect.endTime - newEventOfOverlappingPeriod.endTime,
      effect.cooldown,
      effect.maxStacks,
      effect.stacks
    );
    this.timeline.addEvent(newEvent);
  }

  public isEffectActiveAt(time: number) {
    return this.timeline.getEventsOverlappingTime(time).length !== 0;
  }

  public isEffectOnCooldownAt(time: number) {
    return this.effects.some(
      (effect) => effect.startTime <= time && effect.cooldownEndsAt > time
    );
  }
}
