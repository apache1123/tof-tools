import { useSnapshot } from 'valtio';

import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { LoadoutStatsEditor } from '../LoadoutStatsEditor';

export function LoadoutStats() {
  const {
    selectedLoadout: { loadoutStats: loadoutsStatsSnap },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const loadoutStatsState = gearComparerState.selectedLoadout.loadoutStats;

  return (
    <LoadoutStatsEditor
      loadoutStatsSnap={loadoutsStatsSnap}
      loadoutStatsState={loadoutStatsState}
    />
  );
}
