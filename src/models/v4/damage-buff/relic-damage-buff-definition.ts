import type { DamageBuffDefinition } from './damage-buff-definition';

export interface RelicDamageBuffDefinition extends DamageBuffDefinition {
  minStarRequirement: number;
  maxStarRequirement: number;
}
