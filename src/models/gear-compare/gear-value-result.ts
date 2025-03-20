import type { DamageBreakdown } from "../damage-breakdown/damage-breakdown";
import type { DamageSummary } from "../damage-summary/damage-summary";

/** Gear value result for a piece of gear in a gear set, including its potential max titan result, if max titan can be determined */
export interface GearValueResult {
  gearValue: number;
  damageSummary: DamageSummary;
  damageBreakdown: DamageBreakdown | undefined;

  maxTitan?: {
    gearValue: number;
    damageSummary: DamageSummary;
    damageBreakdown: DamageBreakdown | undefined;
  };
}
