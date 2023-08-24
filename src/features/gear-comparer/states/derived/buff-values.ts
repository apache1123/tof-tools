import { derive, devtools } from 'valtio/utils';

import type { MatrixSetBuff } from '../../../../models/matrix-set-buff';
import type { WeaponBuff } from '../../../../models/weapon-buff';
import { matrixSetBuffsState } from './matrix-set-buffs';
import { weaponBuffsState } from './weapon-buffs';

export interface BuffValuesState {
  weaponAttackBuffValues: number[];
  matrixAttackBuffValues: number[];
  weaponCritRateBuffValues: number[];
  matrixCritRateBuffValues: number[];
  matrixCritDamageBuffValues: number[];
}

export const buffValuesState = derive<object, BuffValuesState>({
  weaponAttackBuffValues: (get): number[] => {
    return get(weaponBuffsState).weaponAttackPercentBuffs.map(mapBuffValue);
  },
  matrixAttackBuffValues: (get): number[] => {
    return get(matrixSetBuffsState).matrixAttackPercentBuffs.map(mapBuffValue);
  },
  weaponCritRateBuffValues: (get): number[] => {
    return get(weaponBuffsState).weaponCritRateBuffs.map(mapBuffValue);
  },
  matrixCritRateBuffValues: (get): number[] => {
    return get(matrixSetBuffsState).matrixCritRateBuffs.map(mapBuffValue);
  },
  matrixCritDamageBuffValues: (get): number[] => {
    return get(matrixSetBuffsState).matrixCritDamageBuffs.map(mapBuffValue);
  },
});
devtools(buffValuesState, { name: 'buffValues' });

function mapBuffValue(buff: WeaponBuff | MatrixSetBuff): number {
  return buff.value;
}
