import type { WeaponElementalType } from "../../elemental-type";
import type { BuffDefinition } from "./buff-definition";

export interface AttackPercentBuffDefinition extends BuffDefinition {
  elementalTypes: WeaponElementalType[];
}
