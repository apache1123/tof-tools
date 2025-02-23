import groupBy from "lodash.groupby";

import { product, sum } from "../../../utils/math-utils";
import type { BuffAggregator } from "../buff-aggregator/buff-aggregator";
import type { DamageBuff } from "./damage-buff";

export const damageBuffAggregator: BuffAggregator<DamageBuff> = (
  buffs: DamageBuff[],
) => {
  const buffsBySource = groupBy(buffs, (buff) => buff.source);

  return {
    totalValue: product(
      ...Object.values(buffsBySource).map((buffs) =>
        sum(...buffs.map((buff) => buff.value ?? 0), 1),
      ),
    )
      .minus(1)
      .toNumber(),
  };
};
