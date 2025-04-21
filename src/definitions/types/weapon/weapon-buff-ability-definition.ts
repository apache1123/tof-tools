import type { WeaponStarRequirement } from "../../../models/weapon/weapon-star-requirement";
import type { BuffAbilityDefinition } from "../buff/buff-ability-definition";

export interface WeaponBuffAbilityDefinition extends BuffAbilityDefinition {
  starRequirement: WeaponStarRequirement;
}
