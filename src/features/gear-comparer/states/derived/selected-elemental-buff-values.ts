import { derive } from 'valtio/utils';

import { matrixSetBuffsState } from './matrix-set-buffs';
import { weaponBuffsState } from './weapon-buffs';

export interface SelectedElementalBuffValuesState {
  weaponAttackBuffValues: number[];
  matrixAttackBuffValues: number[];
  weaponCritRateBuffValues: number[];
  matrixCritRateBuffValues: number[];
  matrixCritDamageBuffValues: number[];
}

export const selectedElementalBuffValuesState = derive<
  object,
  SelectedElementalBuffValuesState
>({
  weaponAttackBuffValues: (get): number[] => {
    return get(weaponBuffsState).weaponAttackPercentBuffs.map(
      (buff) => buff.value
    );
  },
  matrixAttackBuffValues: (get): number[] => {
    return get(matrixSetBuffsState).matrixAttackPercentBuffs.map(
      (buff) => buff.value
    );
  },
  weaponCritRateBuffValues: (get): number[] => {
    return get(weaponBuffsState).weaponCritRateBuffs.map((buff) => buff.value);
  },
  matrixCritRateBuffValues: (get): number[] => {
    return get(matrixSetBuffsState).matrixCritRateBuffs.map(
      (buff) => buff.value
    );
  },
  matrixCritDamageBuffValues: (get): number[] => {
    return get(matrixSetBuffsState).matrixCritDamageBuffs.map(
      (buff) => buff.value
    );
  },
});
