import type { DamageBreakdown } from "../../models/damage-breakdown/damage-breakdown";
import { ElementalAttack } from "../../models/elemental-attack/elemental-attack";
import { exampleBuffSummary } from "./buff-summary";

export const exampleDamageBreakdown = {
  element: "Flame",
  attack: new ElementalAttack("Flame", 12345, 23456),
  buffSummary: exampleBuffSummary,
} as const satisfies DamageBreakdown;
