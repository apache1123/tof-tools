import type { WeaponElementalType } from "../../../../definitions/elemental-type";
import { sum } from "../../../../utils/math-utils";
import type { AttackPercentBuff } from "./attack-percent-buff";

export class AttackPercentBuffAggregate {
  public constructor(private readonly attackBuff: AttackPercentBuff[]) {}

  public getAggregatedResult(): AttackBuffAggregatedResult {
    const attackPercentByElement: Record<WeaponElementalType, number> = {
      Altered: 0,
      Flame: 0,
      Frost: 0,
      Physical: 0,
      Volt: 0,
    };

    for (const buff of this.attackBuff) {
      const elementalType = buff.elementalType;
      attackPercentByElement[elementalType] = sum(
        attackPercentByElement[elementalType],
        buff.value,
      ).toNumber();
    }

    return { attackPercentByElement };
  }
}

export interface AttackBuffAggregatedResult {
  attackPercentByElement: Record<WeaponElementalType, number>;
}
