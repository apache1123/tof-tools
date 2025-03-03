import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { BuffSummary } from "../buff-summary/buff-summary";
import type { ElementalAttack } from "../elemental-attack/elemental-attack";

export interface DamageBreakdown {
  element: WeaponElementalType;
  attack: ElementalAttack;
  buffSummary: BuffSummary;
}
