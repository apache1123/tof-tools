import { useSnapshot } from 'valtio';

import type { LoadoutStats as LoadoutStatsModel } from '../../models/loadout-stats';
import { loadoutsState } from '../../states/states';
import { LoadoutStatsEditor } from '../LoadoutStatsEditor';

export function LoadoutStats() {
  const loadoutsSnap = useSnapshot(loadoutsState);
  const loadoutStatsSnap = loadoutsSnap.selectedLoadout
    .loadoutStats as LoadoutStatsModel;

  return (
    <LoadoutStatsEditor
      loadoutStatsSnap={loadoutStatsSnap}
      loadoutStatsState={loadoutsState.selectedLoadout.loadoutStats}
    />
  );
}
