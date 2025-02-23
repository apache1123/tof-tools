import { sum } from "../../../utils/math-utils";
import type { BuffAggregator } from "../buff-aggregator/buff-aggregator";
import type { CritRateBuff } from "./crit-rate-buff";

export const critRateBuffAggregator: BuffAggregator = (
  buffs: CritRateBuff[],
) => {
  return {
    totalValue: sum(...buffs.map((buff) => buff.value)).toNumber(),
  };
};
