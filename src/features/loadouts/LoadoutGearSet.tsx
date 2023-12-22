import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import { gearTypesLookup } from '../../constants/gear-types';
import type { LoadoutsState } from '../../states/loadouts';
import { loadoutsState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';
import { GearValue } from '../GearValue';

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

        const gearValue = loadoutSnap.getGearValue(gearTypeId);

        return (
          <Grid key={gearTypeId} xs={12} sm={6} md={4} lg={3}>
            <GearPiece
              gearSnap={gearSnap}
              gearState={gearState}
              gearTypeSelector={
                <GearTypeSelector
                  selectedValue={{
                    gearType: gearSnap.type,
                    isTitan: gearSnap.isAugmented,
                  }}
                  onChange={({ gearType, isTitan }) => {
                    if (gearType.id === gearState.type.id) {
                      gearState.isAugmented = isTitan;
                    }
                  }}
                  disableGearTypeChange
                />
              }
              actions={
                <GearOCRModal
                  onFinalizeGear={(gearFromOCR) => {
                    if (gearFromOCR.type.id === gearTypeId) {
                      gearSetState.setGear(gearFromOCR);
                    }
                  }}
                  enforceGearType={gearSnap.type.id}
                />
              }
              showStatSummary={loadoutSnap.elementalType}
              data-testid={gearTypeId}
            />
            <GearValue gearValue={gearValue} data-testid={gearTypeId} />
          </Grid>
        );
      })}
    </Grid>
  );
}
