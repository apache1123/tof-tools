import { derive, devtools } from 'valtio/utils';

import { additiveSum } from '../../../../utils/math-utils';
import { buffValuesState } from './buff-values';

export interface BuffTotalsState {
  attackBuffTotal: number;
  critRateBuffTotal: number;
  critDamageBuffTotal: number;
}

export const buffTotalsState = derive<object, BuffTotalsState>({
  attackBuffTotal(get) {
    const { weaponAttackBuffValues, matrixAttackBuffValues } =
      get(buffValuesState);
    return additiveSum(
      weaponAttackBuffValues.concat(matrixAttackBuffValues)
    ).toNumber();
  },
  critRateBuffTotal(get) {
    const { weaponCritRateBuffValues, matrixCritRateBuffValues } =
      get(buffValuesState);
    return additiveSum(
      weaponCritRateBuffValues.concat(matrixCritRateBuffValues)
    ).toNumber();
  },
  critDamageBuffTotal(get) {
    const { matrixCritDamageBuffValues } = get(buffValuesState);
    return additiveSum(matrixCritDamageBuffValues).toNumber();
  },
});
devtools(buffTotalsState, { name: 'buffTotals' });
