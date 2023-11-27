import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { gearTypesLookup } from '../../constants/gear-types';
import type { GearSet } from '../../models/gear-set';
import { loadoutsState } from '../../states/states';
import { GearPiece } from '../GearPiece';

export function LoadoutGearSet() {
  const { selectedLoadout: loadoutSnap } = useSnapshot(loadoutsState);
  const { gearSet: gearSetSnap } = loadoutSnap;

  const {
    selectedLoadoutItem: {
      loadout: { gearSet: gearSetState },
    },
  } = loadoutsState;

  return (
    <Grid container spacing={3}>
      {gearTypesLookup.allIds.map((gearTypeId) => {
        const gearSnap = (gearSetSnap as GearSet).getGearByType(gearTypeId);
        const gearState = gearSetState.getGearByType(gearTypeId);
        if (!gearSnap || !gearState) return null;

        return (
          <Grid key={gearTypeId} xs={12} sm={6} md={4} lg={3}>
            <GearPiece
              gearSnap={gearSnap}
              gearState={gearState}
              showGearOCRButton
              disableGearTypeChange
              showStatSummary={loadoutSnap.elementalType}
              data-testid={gearTypeId}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
