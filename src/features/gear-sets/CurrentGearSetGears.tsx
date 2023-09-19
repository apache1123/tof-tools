import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/router';
import { useSnapshot } from 'valtio';

import { gearTypesLookup } from '../../constants/gear-types';
import { Gear } from '../../models/gear';
import type { GearSet } from '../../models/gear-set';
import { gearComparerGearsState } from '../gear-comparer/states/gear-comparer-gear';
import { gearComparerOptionsState } from '../gear-comparer/states/gear-comparer-options';
import { GearPiece } from '../GearPiece';
import { gearSetsState } from './states/gear-sets';

export function CurrentGearSetGears() {
  const { selectedGearSet: selectedGearSetSnap } = useSnapshot(gearSetsState);
  const { selectedGearSet: selectedGearSetState } = gearSetsState;

  const router = useRouter();

  if (!selectedGearSetSnap || !selectedGearSetState) {
    // TODO: handle
    return null;
  }

  function handleCompareGear(gear: Gear) {
    if (gearComparerGearsState.GearA) {
      Gear.copy(gear, gearComparerGearsState.GearA);
    } else {
      const newGearA = new Gear(gear.type);
      Gear.copy(gear, newGearA);
      gearComparerGearsState.GearA = newGearA;
    }

    if (selectedGearSetState?.elementalType) {
      gearComparerOptionsState.selectedElementalType =
        selectedGearSetState.elementalType;
    }

    router.push('/gear-comparer');
  }

  return (
    <Grid container spacing={3}>
      {gearTypesLookup.allIds.map((gearTypeId) => {
        const gearSnap = (selectedGearSetSnap as GearSet).getGearByType(
          gearTypeId
        );
        const gearState = selectedGearSetState.getGearByType(gearTypeId);
        if (!gearSnap || !gearState) return null;

        return (
          <Grid key={gearTypeId} xs={12} sm={6} md={4} lg={3}>
            <GearPiece
              gearState={gearState}
              showGearOCRButton
              showCompareGearButton
              onCompareGear={() => {
                handleCompareGear(gearState);
              }}
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
