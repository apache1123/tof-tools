import type { BuffDefinition } from '../buff/buff-definition';

export interface RelicBuffDefinition extends BuffDefinition {
  minStarRequirement: number;
  maxStarRequirement: number;
}
