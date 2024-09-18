import { sum } from '../../../../utils/math-utils';
import type { CritRateBuff } from './crit-rate-buff';

export class CritRateBuffAggregate {
  public constructor(private readonly critRateBuffs: CritRateBuff[]) {}

  public getAggregatedResult(): CritRateBuffAggregatedResult {
    return {
      critRatePercent: sum(
        ...this.critRateBuffs.map((buff) => buff.value)
      ).toNumber(),
    };
  }
}

export interface CritRateBuffAggregatedResult {
  critRatePercent: number;
}
