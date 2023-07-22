import { derive } from 'valtio/utils';

import { matrixAttackBuffsLookup } from '../../../../constants/matrix-attack-buffs';
import { matrixCritDamageBuffsLookup } from '../../../../constants/matrix-crit-damage-buffs';
import { matrixCritRateBuffsLookup } from '../../../../constants/matrix-crit-rate-buffs';
import { weaponAttackBuffsLookup } from '../../../../constants/weapon-attack-buffs';
import { weaponCritRateBuffsLookup } from '../../../../constants/weapon-crit-rate-buffs';
import { getMatrixBuffValues, getWeaponBuffValues } from '../buffs';
import { selectedElementalBuffsStore } from './selected-elemental-buffs';

export interface SelectedElementalBuffValuesStore {
  weaponAttackBuffValues: number[];
  matrixAttackBuffValues: number[];
  weaponCritRateBuffValues: number[];
  matrixCritRateBuffValues: number[];
  matrixCritDamageBuffValues: number[];
}

export const selectedElementalBuffValuesStore = derive<
  object,
  SelectedElementalBuffValuesStore
>({
  weaponAttackBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getWeaponBuffValues(
      selectedElementalBuffs.weaponAttackBuffs,
      weaponAttackBuffsLookup
    );
  },
  matrixAttackBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getMatrixBuffValues(
      selectedElementalBuffs.matrixAttackBuffs,
      matrixAttackBuffsLookup
    );
  },
  weaponCritRateBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getWeaponBuffValues(
      selectedElementalBuffs.weaponCritRateBuffs,
      weaponCritRateBuffsLookup
    );
  },
  matrixCritRateBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getMatrixBuffValues(
      selectedElementalBuffs.matrixCritRateBuffs,
      matrixCritRateBuffsLookup
    );
  },
  matrixCritDamageBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getMatrixBuffValues(
      selectedElementalBuffs.matrixCritDamageBuffs,
      matrixCritDamageBuffsLookup
    );
  },
});
