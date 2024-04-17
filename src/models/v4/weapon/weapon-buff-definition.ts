import type { BuffDefinition } from '../buff/buff-definition';

export interface WeaponBuffDefinition extends BuffDefinition {
  minStarRequirement: number;
  maxStarRequirement: number;
}
