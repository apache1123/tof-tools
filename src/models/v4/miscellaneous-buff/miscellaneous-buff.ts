import { Effect } from '../effect/effect';
import type { EffectTimeline } from '../timelines/effect-timeline';
import type { MiscellaneousBuffDefinition } from './miscellaneous-buff-definition';

export class MiscellaneousBuff extends Effect {
  public constructor(
    public readonly miscBuffDefinition: MiscellaneousBuffDefinition,
    public readonly timeline: EffectTimeline
  ) {
    super(miscBuffDefinition, timeline);
  }
}
