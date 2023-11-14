import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/router';
import { useSnapshot } from 'valtio';

import { gearTypesLookup } from '../../constants/gear-types';
import type { Gear } from '../../models/gear';
import type { GearSet } from '../../models/gear-set';
import { loadoutsState } from '../../states/loadouts';
import { GearPiece } from '../GearPiece';

export function LoadoutGearSet() {
  const { selectedLoadout: loadoutSnap } = useSnapshot(loadoutsState);
  const { gearSet: gearSetSnap } = loadoutSnap;

  const {
    selectedLoadoutItem: {
      loadout: { gearSet: gearSetState },
    },
  } = loadoutsState;

  const router = useRouter();

  function handleCompareGear(gear: Gear) {
    // TODO:
    // if (gearComparerGearsState.GearA) {
    //   Gear.copy(gear, gearComparerGearsState.GearA);
    // } else {
    //   const newGearA = new Gear(gear.type);
    //   Gear.copy(gear, newGearA);
    //   gearComparerGearsState.GearA = newGearA;
    // }
    // if (gearSetState?.elementalType) {
    //   gearComparerOptionsState.selectedElementalType =
    //     gearSetState.elementalType;
    // }
    // router.push('/gear-comparer');
  }

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
              showCompareGearButton
              onCompareGear={() => {
                handleCompareGear(gearState);
              }}
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
