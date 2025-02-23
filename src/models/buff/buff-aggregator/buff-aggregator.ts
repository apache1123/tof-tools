import type { Buff } from "../buff";

export type BuffAggregator<T extends Buff = Buff> = (
  buffs: T[],
) => BuffAggregatorResult;
export interface BuffAggregatorResult {
  /** The total buff amount value that applies to "all element" buffs, e.g. crit rate buff, crit damage buff, final damage buff */
  totalValue: number;
}
