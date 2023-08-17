import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Buff, MatrixBuff } from '../../../models/buff';
import type { Data, DataById } from '../../../models/data';
import type { CoreElementalType } from '../../../models/elemental-type';

type WeaponBuffs = DataById<string, NonNullable<unknown>>;

type MatrixBuffs = DataById<string, { stars: number }>;

export interface ElementalBuffs {
  weaponAttackBuffs: WeaponBuffs;
  matrixAttackBuffs: MatrixBuffs;
  weaponCritRateBuffs: WeaponBuffs;
  matrixCritRateBuffs: MatrixBuffs;
  matrixCritDamageBuffs: MatrixBuffs;
}

export interface BuffsState {
  buffsByElement: DataById<CoreElementalType, ElementalBuffs>;
}

export const buffsStateKey = 'buffs';

export const buffsState = proxy<BuffsState>({
  buffsByElement: {
    Flame: emptyElementalBuffs(),
    Frost: emptyElementalBuffs(),
    Physical: emptyElementalBuffs(),
    Volt: emptyElementalBuffs(),
  },
});
devtools(buffsState, { name: buffsStateKey });

export function addWeaponBuff(collection: WeaponBuffs, id: string) {
  collection[id] = {};
}
export function removeWeaponBuff(collection: WeaponBuffs, id: string) {
  delete collection[id];
}

export function addMatrixBuff(
  collection: MatrixBuffs,
  id: string,
  stars: number
) {
  collection[id] = { stars };
}
export function removeMatrixBuff(collection: MatrixBuffs, id: string) {
  delete collection[id];
}

export function getWeaponBuffValues(
  selectedWeaponBuffs: WeaponBuffs,
  buffsLookup: Data<string, Buff>
) {
  return Object.keys(selectedWeaponBuffs).map(
    (id) => buffsLookup.byId[id]?.value ?? 0
  );
}
export function getMatrixBuffValues(
  matrixBuffs: MatrixBuffs,
  buffsLookup: Data<string, MatrixBuff>
) {
  return Object.keys(matrixBuffs).map(
    (id) =>
      buffsLookup.byId[id]?.starValues.find(
        (starValue) => starValue.star === matrixBuffs[id].stars
      )?.value ?? 0
  );
}

function emptyElementalBuffs(): ElementalBuffs {
  return {
    weaponAttackBuffs: {},
    matrixAttackBuffs: {},
    weaponCritRateBuffs: {},
    matrixCritRateBuffs: {},
    matrixCritDamageBuffs: {},
  };
}
