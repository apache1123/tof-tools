import { sum } from "../../../utils/math-utils";
import type { BuffAggregator } from "../buff-aggregator/buff-aggregator";
import type { CritDamageBuff } from "./crit-damage-buff";

export const critDamageBuffAggregator: BuffAggregator = (
  buffs: CritDamageBuff[],
) => {
  return {
    totalValue: sum(...buffs.map((buff) => buff.value)).toNumber(),
  };
};
