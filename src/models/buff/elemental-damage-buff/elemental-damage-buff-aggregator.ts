import groupBy from "lodash.groupby";

import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { ElementalBuffAggregator } from "../buff-aggregator/elemental-buff-aggregator";
import { damageBuffAggregator } from "../damage-buff/damage-buff-aggregator";
import type { ElementalDamageBuff } from "./elemental-damage-buff";

export const elementalDamageBuffAggregator: ElementalBuffAggregator<
  ElementalDamageBuff
> = (buffs: ElementalDamageBuff[]) => {
  const totalValueByElement: Record<WeaponElementalType, number> = {
    Altered: 0,
    Flame: 0,
    Frost: 0,
    Physical: 0,
    Volt: 0,
  };

  const buffsByElement = groupBy(buffs, (buff) => buff.elementalType);

  (Object.keys(buffsByElement) as WeaponElementalType[]).forEach(
    (elementalType) => {
      const buffs = buffsByElement[elementalType];
      if (!buffs) return;

      totalValueByElement[elementalType] =
        damageBuffAggregator(buffs).totalValue;
    },
  );

  return { totalValueByElement };
};
