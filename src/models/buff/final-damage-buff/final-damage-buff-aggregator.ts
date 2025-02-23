import type { BuffAggregator } from "../buff-aggregator/buff-aggregator";
import { damageBuffAggregator } from "../damage-buff/damage-buff-aggregator";
import type { FinalDamageBuff } from "./final-damage-buff";

export const finalDamageBuffAggregator: BuffAggregator<FinalDamageBuff> = (
  buffs: FinalDamageBuff[],
) => {
  return {
    totalValue: damageBuffAggregator(buffs).totalValue,
  };
};
