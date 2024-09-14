import groupBy from 'lodash.groupby';

import { product, sum } from '../../../utils/math-utils';
import type { DamageBuff } from './damage-buff';

export class DamageBuffAggregate {
  public constructor(private readonly damageBuffs: DamageBuff[]) {}

  public getAggregatedResult(): DamageBuffAggregatedResult {
    const buffsBySource = groupBy(this.damageBuffs, (buff) => buff.source);

    return {
      damagePercent: product(
        ...Object.values(buffsBySource).map((buffs) =>
          sum(...buffs.map((buff) => buff.value ?? 0), 1)
        )
      )
        .minus(1)
        .toNumber(),
    };
  }
}

export interface DamageBuffAggregatedResult {
  damagePercent: number;
}
