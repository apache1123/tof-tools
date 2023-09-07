import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Data } from '../../../models/data';
import type { CoreElementalType } from '../../../models/elemental-type';
import {
  type GearSet,
  newGearSet,
  setElementalType,
} from '../../../models/gear-set';

export const gearSetsStateKey = 'gearSets';

export interface GearSetsState {
  gearSets: Data<string, GearSet>;
  selectedGearSetIndex: number;
  get selectedGearSet(): GearSet | undefined;
  get defaultNewGearSetName(): string;
}

const defaultGearSet = getDefaultGearSet();
export const gearSetsState = proxy<GearSetsState>({
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
  get defaultNewGearSetName() {
    return getDefaultGearSetName(this.gearSets.allIds.length);
  },
});
devtools(gearSetsState, { name: gearSetsStateKey });

export function addGearSet(gearSet: GearSet) {
  const { id } = gearSet;
  gearSetsState.gearSets.allIds.push(id);
  gearSetsState.gearSets.byId[id] = gearSet;
}

export function setSelectedGearSetIndex(index: number) {
  if (gearSetsState.gearSets.allIds[index]) {
    gearSetsState.selectedGearSetIndex = index;
  }
}

export function deleteSelectedGearSet() {
  const {
    gearSets: { allIds, byId },
    selectedGearSetIndex,
    selectedGearSet,
  } = gearSetsState;

  if (selectedGearSet) {
    allIds.splice(selectedGearSetIndex, 1);
    delete byId[selectedGearSet.id];
  }

  // Ensure there is always at least one default gear set
  if (!allIds.length) {
    addGearSet(getDefaultGearSet());
  }

  if (selectedGearSetIndex >= allIds.length) {
    setSelectedGearSetIndex(allIds.length - 1);
  }
}

export function getDefaultGearSetName(gearSetIndex: number) {
  return `Set ${gearSetIndex + 1}`;
}

export function setSelectedGearSetElementalType(
  elementalType: CoreElementalType
) {
  const { selectedGearSet } = gearSetsState;
  if (!selectedGearSet) return;

  setElementalType(selectedGearSet, elementalType);
}

function getDefaultGearSet() {
  const defaultGearSetName = getDefaultGearSetName(0);
  const defaultGearSet = newGearSet(defaultGearSetName);
  return defaultGearSet;
}
