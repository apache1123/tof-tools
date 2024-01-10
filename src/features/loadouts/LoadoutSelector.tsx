import { Link } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { LoadoutSelector as LoadoutSelectorComponent } from '../../components/LoadoutSelector/LoadoutSelector';
import type { LoadoutsState } from '../../states/loadouts';
import { gearComparerState, loadoutsState } from '../../states/states';

export function LoadoutSelector() {
  const { loadoutList, selectedLoadout } = useSnapshot(
    loadoutsState
  ) as LoadoutsState;

  return (
    <>
      <Grid container spacing={1}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <LoadoutSelectorComponent
            loadoutList={loadoutList}
            selectedLoadout={selectedLoadout}
            onLoadoutChange={(loadout, index) => {
              gearComparerState.loadoutsState.selectedLoadoutIndex = index;
            }}
            variant="filled"
          />
        </Grid>
        <Grid display="flex" alignItems="center">
          <Link href="/loadouts">Manage loadouts</Link>
        </Grid>
      </Grid>
    </>
  );
}
