import type { BuffDefinition } from '../buff/buff-definition';
import type { WeaponStarRequirement } from './weapon-star-requirement';

export interface WeaponBuffDefinition extends BuffDefinition {
  starRequirement: WeaponStarRequirement;
}
