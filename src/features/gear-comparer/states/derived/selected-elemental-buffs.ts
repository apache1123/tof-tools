import { derive } from 'valtio/utils';

import type { ElementalBuffs } from '../buffs';
import {
  addMatrixBuff,
  addWeaponBuff,
  buffsState,
  removeMatrixBuff,
  removeWeaponBuff,
} from '../buffs';
import { gearComparerOptionsState } from '../gear-comparer-options';

export interface SelectedElementalBuffsState {
  selectedElementalBuffs: ElementalBuffs | undefined;
}

export const selectedElementalBuffsState = derive<
  object,
  SelectedElementalBuffsState
>({
  selectedElementalBuffs: (get) => {
    const { selectedElementalType } = get(gearComparerOptionsState);
    if (!selectedElementalType) {
      return undefined;
    }

    return get(buffsState).buffsByElement[selectedElementalType];
  },
});

export function addWeaponAttackBuff(id: string) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    addWeaponBuff(selectedElementalBuffs.weaponAttackBuffs, id);
  }
}
export function removeWeaponAttackBuff(id: string) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    removeWeaponBuff(selectedElementalBuffs.weaponAttackBuffs, id);
  }
}

export function addMatrixAttackBuff(id: string, stars: number) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    addMatrixBuff(selectedElementalBuffs.matrixAttackBuffs, id, stars);
  }
}
export function removeMatrixAttackBuff(id: string) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    removeMatrixBuff(selectedElementalBuffs.matrixAttackBuffs, id);
  }
}

export function addWeaponCritRateBuff(id: string) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    addWeaponBuff(selectedElementalBuffs.weaponCritRateBuffs, id);
  }
}
export function removeWeaponCritRateBuff(id: string) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    removeWeaponBuff(selectedElementalBuffs.weaponCritRateBuffs, id);
  }
}

export function addMatrixCritRateBuff(id: string, stars: number) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    addMatrixBuff(selectedElementalBuffs.matrixCritRateBuffs, id, stars);
  }
}
export function removeMatrixCritRateBuff(id: string) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    removeMatrixBuff(selectedElementalBuffs.matrixCritRateBuffs, id);
  }
}

export function addMatrixCritDamageBuff(id: string, stars: number) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    addMatrixBuff(selectedElementalBuffs.matrixCritDamageBuffs, id, stars);
  }
}
export function removeMatrixCritDamageBuff(id: string) {
  const { selectedElementalBuffs } = selectedElementalBuffsState;
  if (selectedElementalBuffs) {
    removeMatrixBuff(selectedElementalBuffs.matrixCritDamageBuffs, id);
  }
}
