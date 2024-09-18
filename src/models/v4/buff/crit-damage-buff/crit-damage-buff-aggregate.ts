import { sum } from '../../../../utils/math-utils';
import type { CritDamageBuff } from './crit-damage-buff';

export class CritDamageBuffAggregate {
  public constructor(private readonly critDamageBuffs: CritDamageBuff[]) {}

  public getAggregatedResult(): CritDamageBuffAggregatedResult {
    return {
      critDamagePercent: sum(
        ...this.critDamageBuffs.map((buff) => buff.value)
      ).toNumber(),
    };
  }
}

export interface CritDamageBuffAggregatedResult {
  critDamagePercent: number;
}
