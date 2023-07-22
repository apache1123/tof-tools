import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { CoreElementalType } from '../../../models/stat-type';

export interface GearComparerOptionsStore {
  selectedElementalType: CoreElementalType | undefined;
}

export const gearComparerOptionsStoreKey = 'gearComparerOptions';

export const gearComparerOptionsStore = proxy<GearComparerOptionsStore>({
  selectedElementalType: undefined,
});
devtools(gearComparerOptionsStore, { name: gearComparerOptionsStoreKey });

export function setSelectedElementalType(elementalType: CoreElementalType) {
  gearComparerOptionsStore.selectedElementalType = elementalType;
}
