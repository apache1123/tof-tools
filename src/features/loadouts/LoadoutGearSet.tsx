import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { gearTypesLookup } from '../../constants/gear-types';
import type { LoadoutsState } from '../../states/loadouts';
import { loadoutsState } from '../../states/states';
import { LoadoutGear } from './LoadoutGear';

export function LoadoutGearSet() {
  const { selectedLoadout: loadoutSnap } = useSnapshot(
    loadoutsState
  ) as LoadoutsState;
  const { gearSet: gearSetSnap } = loadoutSnap;

  const {
    selectedLoadoutItem: {
      loadout: { gearSet: gearSetState },
    },
  } = loadoutsState;

  return (
    <Grid container spacing={3}>
      {gearTypesLookup.allIds.map((gearTypeId) => {
        const gearSnap = gearSetSnap.getGearByType(gearTypeId);
        const gearState = gearSetState.getGearByType(gearTypeId);
        if (!gearSnap || !gearState) return null;

        return (
          <Grid key={gearTypeId} xs={12} sm={6} md={4} lg={3}>
            <LoadoutGear gearSnap={gearSnap} gearState={gearState} />
          </Grid>
        );
      })}
    </Grid>
  );
}
