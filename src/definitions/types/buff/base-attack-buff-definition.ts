import type { WeaponElementalType } from "../../elemental-type";
import type { BuffDefinition } from "./buff-definition";

export interface BaseAttackBuffDefinition extends BuffDefinition {
  elementalTypes: WeaponElementalType[];
}
