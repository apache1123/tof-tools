import type { ElementalType } from "../../definitions/elemental-type";
import type { BuffSummary } from "../buff-summary/buff-summary";
import type { ElementalAttack } from "../elemental-attack/elemental-attack";

export interface DamageBreakdown {
  element: ElementalType;
  attack: ElementalAttack;
  buffSummary: BuffSummary;
}
