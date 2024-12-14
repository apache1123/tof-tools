import type { WeaponElementalType } from "../../definitions/elemental-type";

export interface GearSummaryStat {
  type:
    | "attackFlat"
    | "attackPercent"
    | "critRateFlat"
    | "critRatePercent"
    | "damagePercent";
  value: number;
  element?: WeaponElementalType;
}
