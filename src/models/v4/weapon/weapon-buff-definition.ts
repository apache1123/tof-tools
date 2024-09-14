import type { BuffAbility } from '../../../definitions/types/buff/buff-ability';
import type { WeaponStarRequirement } from './weapon-star-requirement';

export interface WeaponBuffDefinition extends BuffAbility {
  starRequirement: WeaponStarRequirement;
}
