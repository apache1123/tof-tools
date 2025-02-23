import type { StatType } from "./stat-type";

export interface PossibleAugmentStats {
  priority: PossibleAugmentStat[];
  fallback: PossibleAugmentStat[];
}

export interface PossibleAugmentStat {
  type: StatType;
}
