import type { BuffSummary } from "../buff-summary/buff-summary";
import type { DamageSummary } from "../damage-summary/damage-summary";

export interface GearResult {
  damageSummary: DamageSummary;
  buffSummary: BuffSummary | undefined;
  gearValue: number;

  maxTitan?: {
    damageSummary: DamageSummary;
    buffSummary: BuffSummary | undefined;
    gearValue: number;
  };
}
