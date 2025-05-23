import type { ElementalType } from "../../../definitions/elemental-type";
import { sum } from "../../../utils/math-utils";
import type { ElementalBuffAggregator } from "../buff-aggregator/elemental-buff-aggregator";
import type { BaseAttackBuff } from "./base-attack-buff";

export const baseAttackBuffAggregator: ElementalBuffAggregator = (
  buffs: BaseAttackBuff[],
) => {
  const totalValueByElement: Record<ElementalType, number> = {
    Altered: 0,
    Flame: 0,
    Frost: 0,
    Physical: 0,
    Volt: 0,
  };

  for (const buff of buffs) {
    const elementalType = buff.elementalType;
    totalValueByElement[elementalType] = sum(
      totalValueByElement[elementalType],
      buff.value,
    ).toNumber();
  }

  return { totalValueByElement };
};
