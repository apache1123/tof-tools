import { Effect } from './effect';
import type { EffectDefinition } from './effect-definition';
import type { EffectEvaluator } from './effect-evaluator';
import type { EffectTimeline } from './effect-timeline';

export class EffectController<T extends EffectDefinition> {
  public constructor(
    public readonly definition: T,
    public readonly timeline: EffectTimeline
  ) {}

  public get id() {
    return this.definition.id;
  }

  public get displayName() {
    return this.definition.displayName;
  }

  public triggerEffect(effectEvaluator: EffectEvaluator) {
    if (
      !effectEvaluator.hasEffectMetRequirements() ||
      !effectEvaluator.canEffectBeTriggered() ||
      effectEvaluator.isEffectOnCooldown()
    )
      return;

    const effectTimePeriod = effectEvaluator.calculateEffectTimePeriod();
    if (!effectTimePeriod) return;

    const { startTime, duration } = effectTimePeriod;
    const { displayName, cooldown, maxStacks } = this.definition;

    const effect = new Effect(startTime, duration, cooldown, maxStacks);
    effect.displayName = displayName;

    this.timeline.addEffect(effect);
  }

  public isEffectActiveAt(time: number) {
    return this.timeline.isEffectActiveAt(time);
  }
}
