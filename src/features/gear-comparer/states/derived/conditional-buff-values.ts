import { derive } from 'valtio/utils';

import type { MatrixSetBuff } from '../../../../models/matrix-set-buff';
import type { WeaponBuff } from '../../../../models/weapon-buff';
import { matrixSetBuffsState } from './matrix-set-buffs';
import { weaponBuffsState } from './weapon-buffs';

export interface ConditionalBuffValuesState {
  weaponAttackBuffValues: number[];
  matrixAttackBuffValues: number[];
  weaponCritRateBuffValues: number[];
  matrixCritRateBuffValues: number[];
  matrixCritDamageBuffValues: number[];
}

export const conditionalBuffValuesState = derive<
  object,
  ConditionalBuffValuesState
>({
  weaponAttackBuffValues: (get): number[] => {
    return get(weaponBuffsState)
      .weaponAttackPercentBuffs.filter(isConditionalBuff)
      .map(mapBuffValue);
  },
  matrixAttackBuffValues: (get): number[] => {
    return get(matrixSetBuffsState)
      .matrixAttackPercentBuffs.filter(isConditionalBuff)
      .map(mapBuffValue);
  },
  weaponCritRateBuffValues: (get): number[] => {
    return get(weaponBuffsState)
      .weaponCritRateBuffs.filter(isConditionalBuff)
      .map(mapBuffValue);
  },
  matrixCritRateBuffValues: (get): number[] => {
    return get(matrixSetBuffsState)
      .matrixCritRateBuffs.filter(isConditionalBuff)
      .map(mapBuffValue);
  },
  matrixCritDamageBuffValues: (get): number[] => {
    return get(matrixSetBuffsState)
      .matrixCritDamageBuffs.filter(isConditionalBuff)
      .map(mapBuffValue);
  },
});

function isConditionalBuff(buff: WeaponBuff | MatrixSetBuff): boolean {
  return !buff.isActivePassively;
}

function mapBuffValue(buff: WeaponBuff | MatrixSetBuff): number {
  return buff.value;
}
