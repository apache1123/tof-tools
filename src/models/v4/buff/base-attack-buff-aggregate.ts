import type { WeaponElementalType } from '../../../definitions/elemental-type';
import { sum } from '../../../utils/math-utils';
import type { BaseAttackBuff } from './base-attack-buff';

export class BaseAttackBuffAggregate {
  public constructor(private readonly baseAttackBuffs: BaseAttackBuff[]) {}

  public getAggregatedResult(): BaseAttackBuffAggregatedResult {
    const baseAttackByElement: Record<WeaponElementalType, number> = {
      Altered: 0,
      Flame: 0,
      Frost: 0,
      Physical: 0,
      Volt: 0,
    };

    for (const buff of this.baseAttackBuffs) {
      const elementalType = buff.elementalType;
      baseAttackByElement[elementalType] = sum(
        baseAttackByElement[elementalType],
        buff.value
      ).toNumber();
    }

    return { baseAttackByElement };
  }
}

export interface BaseAttackBuffAggregatedResult {
  baseAttackByElement: Record<WeaponElementalType, number>;
}
