import { useSnapshot } from 'valtio';

import type { LoadoutsState } from '../../states/loadouts';
import { loadoutsState } from '../../states/states';
import { LoadoutStatsEditor } from './LoadoutStatsEditor';

export function LoadoutStats() {
  const {
    selectedLoadout: { loadoutStats: loadoutsStatsSnap },
  } = useSnapshot(loadoutsState) as LoadoutsState;
  const loadoutStatsState = loadoutsState.selectedLoadout.loadoutStats;

  return (
    <LoadoutStatsEditor
      loadoutStatsSnap={loadoutsStatsSnap}
      loadoutStatsState={loadoutStatsState}
    />
  );
}
