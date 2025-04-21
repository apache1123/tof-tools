import type { ElementalType } from "../../../definitions/elemental-type";
import type { ElementalBuff } from "../elemental-buff";

export type ElementalBuffAggregator<T extends ElementalBuff = ElementalBuff> = (
  buffs: T[],
) => ElementalBuffAggregatorResult;

export interface ElementalBuffAggregatorResult {
  /** The total buff amount value for each element. Relevant to buffs that are specific to an element, e.g. elemental damage buff, attack percent buff */
  totalValueByElement: Record<ElementalType, number>;
}
