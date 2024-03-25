import type { Effect } from './effect';
import type { EffectEvaluator } from './effect-evaluator';

export class EffectTrigger {
  public constructor(
    private readonly effect: Effect,
    private readonly effectEvaluator: EffectEvaluator
  ) {}

  public trigger() {
    if (
      !this.effectEvaluator.hasEffectMetRequirements() ||
      !this.effectEvaluator.canEffectTrigger()
    )
      return;

    const effectTimePeriod = this.effectEvaluator.determineEffectTimePeriod();
    if (!effectTimePeriod) return;

    const { startTime, duration } = effectTimePeriod;
    this.effect.trigger(startTime, duration);
  }
}
