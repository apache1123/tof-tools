import { Effect } from '../effect/effect';
import type { EffectTimeline } from '../timelines/effect-timeline';
import type { AttackBuffDefinition } from './attack-buff-definition';

export class AttackBuff extends Effect {
  public constructor(
    public readonly attackBuffDefinition: AttackBuffDefinition,
    public readonly timeline: EffectTimeline
  ) {
    super(attackBuffDefinition, timeline);
  }
}
