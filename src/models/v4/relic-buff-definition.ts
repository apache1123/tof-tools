import type { WeaponDamageBuffDefinition } from './weapon-damage-buff-definition';

export interface RelicBuffDefinition extends WeaponDamageBuffDefinition {
  minStarRequirement: number;
  maxStarRequirement: number;
}
