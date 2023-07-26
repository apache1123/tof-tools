import { derive } from 'valtio/utils';

import { activeMatrixAttackBuffsLookup } from '../../../../constants/matrix-attack-buffs';
import { activeMatrixCritDamageBuffsLookup } from '../../../../constants/matrix-crit-damage-buffs';
import { activeMatrixCritRateBuffsLookup } from '../../../../constants/matrix-crit-rate-buffs';
import { activeWeaponAttackBuffsLookup } from '../../../../constants/weapon-attack-buffs';
import { activeWeaponCritRateBuffsLookup } from '../../../../constants/weapon-crit-rate-buffs';
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
      activeWeaponAttackBuffsLookup
    );
  },
  matrixAttackBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getMatrixBuffValues(
      selectedElementalBuffs.matrixAttackBuffs,
      activeMatrixAttackBuffsLookup
    );
  },
  weaponCritRateBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getWeaponBuffValues(
      selectedElementalBuffs.weaponCritRateBuffs,
      activeWeaponCritRateBuffsLookup
    );
  },
  matrixCritRateBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getMatrixBuffValues(
      selectedElementalBuffs.matrixCritRateBuffs,
      activeMatrixCritRateBuffsLookup
    );
  },
  matrixCritDamageBuffValues: (get): number[] => {
    const { selectedElementalBuffs } = get(selectedElementalBuffsStore);
    if (!selectedElementalBuffs) {
      return [];
    }

    return getMatrixBuffValues(
      selectedElementalBuffs.matrixCritDamageBuffs,
      activeMatrixCritDamageBuffsLookup
    );
  },
});
