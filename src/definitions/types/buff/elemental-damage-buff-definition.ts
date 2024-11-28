import type { WeaponElementalType } from "../../elemental-type";
import type { BuffDefinition } from "./buff-definition";

export interface ElementalDamageBuffDefinition extends BuffDefinition {
  elementalTypes: WeaponElementalType[];
}
