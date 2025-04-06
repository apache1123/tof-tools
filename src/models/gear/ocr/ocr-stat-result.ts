import type { StatType } from "../stat-type";

export type OcrStatResult = {
  statType: StatType;
  value: number | undefined;
};
