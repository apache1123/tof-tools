import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Data } from '../../../models/data';
import { type GearSet, newGearSet } from '../../../models/gear-set';

export const gearSetsStoreKey = 'gearSets';

export interface GearSetsStore {
  gearSets: Data<string, GearSet>;
  selectedGearSetIndex: number;
  get selectedGearSet(): GearSet | undefined;
}

const defaultGearSet = newGearSet();
defaultGearSet.name = getDefaultGearSetName(defaultGearSet, 0);
export const gearSetsStore = proxy<GearSetsStore>({
  gearSets: {
    allIds: [defaultGearSet.id],
    byId: { [defaultGearSet.id]: defaultGearSet },
  },
  selectedGearSetIndex: 0,
  get selectedGearSet() {
    const selectedGearSetId = this.gearSets.allIds[this.selectedGearSetIndex];
    if (selectedGearSetId) {
      return this.gearSets.byId[selectedGearSetId];
    }
    return undefined;
  },
});
devtools(gearSetsStore, { name: gearSetsStoreKey });

export function addGearSet(gearSet: GearSet) {
  const { id } = gearSet;
  gearSetsStore.gearSets.allIds.push(id);
  gearSetsStore.gearSets.byId[id] = gearSet;
}

export function setSelectedGearSetIndex(index: number) {
  if (gearSetsStore.gearSets.allIds[index]) {
    gearSetsStore.selectedGearSetIndex = index;
  }
}

export function getDefaultGearSetName(gearSet: GearSet, gearSetIndex: number) {
  return `Set ${gearSetIndex + 1}`;
}
