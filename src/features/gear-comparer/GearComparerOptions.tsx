import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { LoadoutSelector } from '../../components/LoadoutSelector/LoadoutSelector';
import type { GearComparerState } from '../../states/gear-comparer';
import type { LoadoutsState } from '../../states/loadouts';
import { gearComparerState, loadoutsState } from '../../states/states';

export function GearComparerOptions() {
  const { loadoutList } = useSnapshot(loadoutsState) as LoadoutsState;
  const { selectedLoadout } = useSnapshot(
    gearComparerState
  ) as GearComparerState;

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4}>
          <LoadoutSelector
            loadoutList={loadoutList}
            selectedLoadout={selectedLoadout}
            onLoadoutChange={(loadout, index) => {
              gearComparerState.selectedLoadoutIndex = index;
            }}
            variant="filled"
          />
        </Grid>
      </Grid>
    </>
  );
}
