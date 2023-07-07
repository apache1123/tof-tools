import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { matrixAttackBuffsLookup } from '../../../constants/matrix-attack-buffs';
import { matrixCritDamageBuffsLookup } from '../../../constants/matrix-crit-damage-buffs';
import { matrixCritRateBuffsLookup } from '../../../constants/matrix-crit-rate-buffs';
import { weaponAttackBuffsLookup } from '../../../constants/weapon-attack-buffs';
import { weaponCritRateBuffsLookup } from '../../../constants/weapon-crit-rate-buffs';
import type { Buff, MatrixBuff } from '../../../models/buff';
import type { Data, DataById } from '../../../models/data';

type SelectedWeaponBuffs = DataById<NonNullable<unknown>>;

type SelectedMatrixBuffs = DataById<{ stars: number }>;

export interface SelectedBuffsStore {
  weaponAttackBuffs: SelectedWeaponBuffs;
  matrixAttackBuffs: SelectedMatrixBuffs;
  weaponCritRateBuffs: SelectedWeaponBuffs;
  matrixCritRateBuffs: SelectedMatrixBuffs;
  matrixCritDamageBuffs: SelectedMatrixBuffs;
  get weaponAttackBuffValues(): number[];
  get matrixAttackBuffValues(): number[];
  get weaponCritRateBuffValues(): number[];
  get matrixCritRateBuffValues(): number[];
  get matrixCritDamageBuffValues(): number[];
}

export const selectedBuffsStoreKey = 'selectedBuffs';

export const selectedBuffsStore = proxy<SelectedBuffsStore>({
  weaponAttackBuffs: {},
  matrixAttackBuffs: {},
  weaponCritRateBuffs: {},
  matrixCritRateBuffs: {},
  matrixCritDamageBuffs: {},
  get weaponAttackBuffValues() {
    return getWeaponBuffValues(this.weaponAttackBuffs, weaponAttackBuffsLookup);
  },
  get matrixAttackBuffValues() {
    return getMatrixBuffValues(this.matrixAttackBuffs, matrixAttackBuffsLookup);
  },
  get weaponCritRateBuffValues() {
    return getWeaponBuffValues(
      this.weaponCritRateBuffs,
      weaponCritRateBuffsLookup
    );
  },
  get matrixCritRateBuffValues() {
    return getMatrixBuffValues(
      this.matrixCritRateBuffs,
      matrixCritRateBuffsLookup
    );
  },
  get matrixCritDamageBuffValues() {
    return getMatrixBuffValues(
      this.matrixCritDamageBuffs,
      matrixCritDamageBuffsLookup
    );
  },
});
devtools(selectedBuffsStore, { name: selectedBuffsStoreKey });

export function addWeaponAttackBuff(id: string) {
  addWeaponBuff(selectedBuffsStore.weaponAttackBuffs, id);
}
export function removeWeaponAttackBuff(id: string) {
  removeWeaponBuff(selectedBuffsStore.weaponAttackBuffs, id);
}

export function addMatrixAttackBuff(id: string, stars: number) {
  addMatrixBuff(selectedBuffsStore.matrixAttackBuffs, id, stars);
}
export function removeMatrixAttackBuff(id: string) {
  removeMatrixBuff(selectedBuffsStore.matrixAttackBuffs, id);
}

export function addWeaponCritRateBuff(id: string) {
  addWeaponBuff(selectedBuffsStore.weaponCritRateBuffs, id);
}
export function removeWeaponCritRateBuff(id: string) {
  removeWeaponBuff(selectedBuffsStore.weaponCritRateBuffs, id);
}

export function addMatrixCritRateBuff(id: string, stars: number) {
  addMatrixBuff(selectedBuffsStore.matrixCritRateBuffs, id, stars);
}
export function removeMatrixCritRateBuff(id: string) {
  removeMatrixBuff(selectedBuffsStore.matrixCritRateBuffs, id);
}

export function addMatrixCritDamageBuff(id: string, stars: number) {
  addMatrixBuff(selectedBuffsStore.matrixCritDamageBuffs, id, stars);
}
export function removeMatrixCritDamageBuff(id: string) {
  removeMatrixBuff(selectedBuffsStore.matrixCritDamageBuffs, id);
}

function addWeaponBuff(collection: SelectedWeaponBuffs, id: string) {
  collection[id] = {};
}
function removeWeaponBuff(collection: SelectedWeaponBuffs, id: string) {
  delete collection[id];
}

function addMatrixBuff(
  collection: SelectedMatrixBuffs,
  id: string,
  stars: number
) {
  collection[id] = { stars };
}
function removeMatrixBuff(collection: SelectedMatrixBuffs, id: string) {
  delete collection[id];
}

function getWeaponBuffValues(
  selectedWeaponBuffs: SelectedWeaponBuffs,
  buffsLookup: Data<Buff>
) {
  return Object.keys(selectedWeaponBuffs).map(
    (id) => buffsLookup.byId[id]?.value ?? 0
  );
}
function getMatrixBuffValues(
  matrixBuffs: SelectedMatrixBuffs,
  buffsLookup: Data<MatrixBuff>
) {
  return Object.keys(matrixBuffs).map(
    (id) =>
      buffsLookup.byId[id]?.starValues.find(
        (starValue) => starValue.star === matrixBuffs[id].stars
      )?.value ?? 0
  );
}
