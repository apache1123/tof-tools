import type { Effect } from './effect';
import type { EffectDefinition } from './effect-definition';

// TODO: This and the Effect class feel odd
export interface EffectInstance<T extends EffectDefinition> {
  definition: T;
  effect: Effect;
}
