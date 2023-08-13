import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { CoreElementalType } from '../../../models/stat-type';

export interface GearComparerOptionsState {
  selectedElementalType: CoreElementalType | undefined;
}

export const gearComparerOptionsStateKey = 'gearComparerOptions';

export const gearComparerOptionsState = proxy<GearComparerOptionsState>({
  selectedElementalType: undefined,
});
devtools(gearComparerOptionsState, { name: gearComparerOptionsStateKey });

export function setSelectedElementalType(elementalType: CoreElementalType) {
  gearComparerOptionsState.selectedElementalType = elementalType;
}
