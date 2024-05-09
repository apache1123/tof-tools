import type { ResourceDefinition } from '../resource/resource-definition';
import type { WeaponStarRequirement } from './weapon-star-requirement';

export interface WeaponResourceDefinition extends ResourceDefinition {
  starRequirement: WeaponStarRequirement;
}
