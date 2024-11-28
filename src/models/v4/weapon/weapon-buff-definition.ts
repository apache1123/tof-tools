import type { BuffAbilityDefinition } from "../../../definitions/types/buff/buff-ability-definition";
import type { WeaponStarRequirement } from "./weapon-star-requirement";

export interface WeaponBuffDefinition extends BuffAbilityDefinition {
  starRequirement: WeaponStarRequirement;
}
