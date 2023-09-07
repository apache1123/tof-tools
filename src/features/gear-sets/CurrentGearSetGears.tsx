import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { gearTypesLookup } from '../../constants/gear-types';
import type { GearSet } from '../../models/gear-set';
import { getGearByType } from '../../models/gear-set';
import { GearPiece } from '../GearPiece';
import { gearSetsState } from './states/gear-sets';

export function CurrentGearSetGears() {
  const { selectedGearSet: selectedGearSetSnap } = useSnapshot(gearSetsState);
  const { selectedGearSet: selectedGearSetState } = gearSetsState;

  if (!selectedGearSetSnap || !selectedGearSetState) {
    // TODO: handle
    return null;
  }

  return (
    <Grid container spacing={3}>
      {gearTypesLookup.allIds.map((gearTypeId) => {
        const gearSnap = getGearByType(
          selectedGearSetSnap as GearSet,
          gearTypeId
        );
        const gearState = getGearByType(selectedGearSetState, gearTypeId);
        if (!gearSnap || !gearState) return null;

        return (
          <Grid key={gearTypeId} xs={12} sm={6} md={4} lg={3}>
            <GearPiece
              gearState={gearState}
              showGearOCRButton
              showCompareGearButton
              disableGearTypeChange
              showStatSummary={selectedGearSetSnap.elementalType}
              data-testid={gearTypeId}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
