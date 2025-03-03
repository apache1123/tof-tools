import type { DamageBreakdown } from "../damage-breakdown/damage-breakdown";
import type { DamageSummary } from "../damage-summary/damage-summary";

export interface GearResult {
  damageSummary: DamageSummary;
  damageBreakdown: DamageBreakdown | undefined;
  gearValue: number;

  maxTitan?: {
    damageSummary: DamageSummary;
    damageBreakdown: DamageBreakdown | undefined;
    gearValue: number;
  };
}
