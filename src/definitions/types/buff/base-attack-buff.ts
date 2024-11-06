import type { WeaponElementalType } from "../../elemental-type";
import type { Buff } from "./buff";

export interface BaseAttackBuff extends Buff {
  elementalTypes: WeaponElementalType[];
}
