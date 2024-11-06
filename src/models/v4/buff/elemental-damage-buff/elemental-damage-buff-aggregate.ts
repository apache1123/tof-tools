import groupBy from "lodash.groupby";

import type { WeaponElementalType } from "../../../../definitions/elemental-type";
import { DamageBuffAggregate } from "../damage-buff/damage-buff-aggregate";
import type { ElementalDamageBuff } from "./elemental-damage-buff";

export class ElementalDamageBuffAggregate {
  public constructor(
    private readonly elementalDamageBuffs: ElementalDamageBuff[],
  ) {}

  public getAggregatedResult(): ElementalDamageBuffAggregatedResult {
    const damagePercentByElement: Record<WeaponElementalType, number> = {
      Altered: 0,
      Flame: 0,
      Frost: 0,
      Physical: 0,
      Volt: 0,
    };

    const buffsByElement = groupBy(
      this.elementalDamageBuffs,
      (buff) => buff.elementalType,
    );

    (Object.keys(buffsByElement) as WeaponElementalType[]).forEach(
      (elementalType) => {
        const buffs = buffsByElement[elementalType];
        if (!buffs) return;

        const damageBuffAggregatedResult = new DamageBuffAggregate(
          buffs,
        ).getAggregatedResult();
        damagePercentByElement[elementalType] =
          damageBuffAggregatedResult.damagePercent;
      },
    );

    return { damagePercentByElement };
  }
}

export interface ElementalDamageBuffAggregatedResult {
  damagePercentByElement: Record<WeaponElementalType, number>;
}
