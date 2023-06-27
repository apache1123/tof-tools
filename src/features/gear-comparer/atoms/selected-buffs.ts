import { produce } from 'immer';
import { atom, Getter, Setter, WritableAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface SelectedWeaponBuff {
  [buffName: string]: NonNullable<unknown>;
}

interface SelectedMatrixBuff {
  [buffName: string]: { stars: number };
}

export const rawSelectedWeaponAttackBuffsAtom =
  atomWithStorage<SelectedWeaponBuff>('selectedWeaponAttackBuffs', {});
export const selectedWeaponAttackBuffsAtom = atom(
  (get) => get(rawSelectedWeaponAttackBuffsAtom),
  (get, set, buffName: string, isSelected: boolean) => {
    setSelectedWeaponBuffAtom(
      rawSelectedWeaponAttackBuffsAtom,
      get,
      set,
      buffName,
      isSelected
    );
  }
);

export const rawSelectedMatrixAttackBuffsAtom =
  atomWithStorage<SelectedMatrixBuff>('selectedMatrixAttackBuffs', {});
export const selectedMatrixAttackBuffsAtom = atom(
  (get) => get(rawSelectedMatrixAttackBuffsAtom),
  (get, set, buffName: string, isSelected: boolean, stars: number) => {
    setSelectedMatrixBuffAtom(
      rawSelectedMatrixAttackBuffsAtom,
      get,
      set,
      buffName,
      isSelected,
      stars
    );
  }
);

export const rawSelectedWeaponCritRateBuffsAtom =
  atomWithStorage<SelectedWeaponBuff>('selectedWeaponCritRateBuffs', {});
export const selectedWeaponCritRateBuffsAtom = atom(
  (get) => get(rawSelectedWeaponCritRateBuffsAtom),
  (get, set, buffName: string, isSelected: boolean) => {
    setSelectedWeaponBuffAtom(
      rawSelectedWeaponCritRateBuffsAtom,
      get,
      set,
      buffName,
      isSelected
    );
  }
);

export const rawSelectedMatrixCritRateBuffsAtom =
  atomWithStorage<SelectedMatrixBuff>('selectedMatrixCritRateBuffs', {});
export const selectedMatrixCritRateBuffsAtom = atom(
  (get) => get(rawSelectedMatrixCritRateBuffsAtom),
  (get, set, buffName: string, isSelected: boolean, stars: number) => {
    setSelectedMatrixBuffAtom(
      rawSelectedMatrixCritRateBuffsAtom,
      get,
      set,
      buffName,
      isSelected,
      stars
    );
  }
);

export const rawSelectedMatrixCritDamageBuffsAtom =
  atomWithStorage<SelectedMatrixBuff>('selectedMatrixCritDamageBuffs', {});
export const selectedMatrixCritDamageBuffsAtom = atom(
  (get) => get(rawSelectedMatrixCritDamageBuffsAtom),
  (get, set, buffName: string, isSelected: boolean, stars: number) => {
    setSelectedMatrixBuffAtom(
      rawSelectedMatrixCritDamageBuffsAtom,
      get,
      set,
      buffName,
      isSelected,
      stars
    );
  }
);

function setSelectedWeaponBuffAtom(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  atom: WritableAtom<SelectedWeaponBuff, any, void>,
  get: Getter,
  set: Setter,
  buffName: string,
  isSelected: boolean
) {
  if (isSelected) {
    set(
      atom,
      produce(get(atom), (draft) => {
        draft[buffName] = {};
      })
    );
  } else {
    set(
      atom,
      produce(get(atom), (draft) => {
        delete draft[buffName];
      })
    );
  }
}

function setSelectedMatrixBuffAtom(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  atom: WritableAtom<SelectedMatrixBuff, any, void>,
  get: Getter,
  set: Setter,
  buffName: string,
  isSelected: boolean,
  stars: number
) {
  if (isSelected) {
    set(
      atom,
      produce(get(atom), (draft) => {
        draft[buffName] = { stars };
      })
    );
  } else {
    set(
      atom,
      produce(get(atom), (draft) => {
        delete draft[buffName];
      })
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  rawSelectedWeaponAttackBuffsAtom.debugLabel = 'rawSelectedWeaponAttackBuffs';
  selectedWeaponAttackBuffsAtom.debugLabel = 'selectedWeaponAttackBuffs';
  rawSelectedMatrixAttackBuffsAtom.debugLabel = 'rawSelectedMatrixAttackBuffs';
  selectedMatrixAttackBuffsAtom.debugLabel = 'selectedMatrixAttackBuffs';
  rawSelectedWeaponCritRateBuffsAtom.debugLabel =
    'rawSelectedWeaponCritRateBuffs';
  selectedWeaponCritRateBuffsAtom.debugLabel = 'selectedWeaponCritRateBuffs';
  rawSelectedMatrixCritRateBuffsAtom.debugLabel =
    'rawSelectedMatrixCritRateBuffs';
  selectedMatrixCritRateBuffsAtom.debugLabel = 'selectedMatrixCritRateBuffs';
  rawSelectedMatrixCritDamageBuffsAtom.debugLabel =
    'rawSelectedMatrixCritDamageBuffs';
  selectedMatrixCritDamageBuffsAtom.debugLabel =
    'selectedMatrixCritDamageBuffs';
}
