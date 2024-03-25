import { Effect } from '../effect/effect';
import type { EffectTimeline } from '../timelines/effect-timeline';
import type { DamageBuffDefinition } from './damage-buff-definition';

export class DamageBuff extends Effect {
  public constructor(
    public readonly damageBuffDefinition: DamageBuffDefinition,
    public readonly timeline: EffectTimeline
  ) {
    super(damageBuffDefinition, timeline);
  }
}
