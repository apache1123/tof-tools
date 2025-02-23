import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { GearSummaryStat } from "./gear-summary-stat";

export interface GearSummary {
  element: Record<WeaponElementalType, GearSummaryStatsForElement>;
  critFlat: GearSummaryStat;
  critPercent: GearSummaryStat;
}

export interface GearSummaryStatsForElement {
  attackFlat: GearSummaryStat;
  attackPercent: GearSummaryStat;
  damagePercent: GearSummaryStat;
}
