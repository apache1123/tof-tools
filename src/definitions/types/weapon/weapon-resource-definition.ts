import type { ResourceDefinition } from "../../../models/resource/resource-definition";
import type { WeaponStarRequirement } from "../../../models/weapon/weapon-star-requirement";

export interface WeaponResourceDefinition extends ResourceDefinition {
  starRequirement: WeaponStarRequirement;
}
