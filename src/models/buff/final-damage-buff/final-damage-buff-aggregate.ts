import { DamageBuffAggregate } from "../damage-buff/damage-buff-aggregate";
import type { FinalDamageBuff } from "./final-damage-buff";

export class FinalDamageBuffAggregate {
  public constructor(private readonly finalDamageBuffs: FinalDamageBuff[]) {}

  public getAggregatedResult(): FinalDamageBuffAggregatedResult {
    const damageBuffAggregatedResult = new DamageBuffAggregate(
      this.finalDamageBuffs,
    ).getAggregatedResult();

    return {
      finalDamagePercent: damageBuffAggregatedResult.damagePercent,
    };
  }
}

export interface FinalDamageBuffAggregatedResult {
  finalDamagePercent: number;
}
