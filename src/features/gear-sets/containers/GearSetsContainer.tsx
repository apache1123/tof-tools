import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { gearTypesLookup } from '../../../constants/gear-types';
import type { GearSet } from '../../../models/gear-set';
import { getGearByType } from '../../../models/gear-set';
import { GearPiece } from '../../GearPiece';
import { gearSetsStore } from '../stores/gear-sets';

export function GearSetsContainer() {
  const { selectedGearSet: selectedGearSetSnap } = useSnapshot(gearSetsStore);
  const { selectedGearSet } = gearSetsStore;

  if (!selectedGearSetSnap || !selectedGearSet) {
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
        const gear = getGearByType(selectedGearSet, gearTypeId);
        if (!gearSnap || !gear) return null;

        return (
          <Grid key={gearTypeId} xs={12} sm={6} md={4} lg={3}>
            <GearPiece
              gear={gear}
              showGearOCRButton
              showCompareGearButton
              disableGearTypeChange
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
