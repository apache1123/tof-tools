import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { Buff } from "./buff";

export interface ElementalBuff extends Buff {
  readonly elementalType: WeaponElementalType;
}
