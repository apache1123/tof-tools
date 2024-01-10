import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';

export function LoadoutGear() {
  const {
    selectedLoadoutGear: gearSnap,
    loadoutsState: {
      selectedLoadout: { elementalType },
    },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const gearState = gearComparerState.selectedLoadoutGear;

  return (
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
            gearComparerState.selectedGearTypeId = gearType.id;
            gearComparerState.selectedLoadoutGear.isAugmented = isTitan;
          }}
        />
      }
      actions={
        <GearOCRModal
          onFinalizeGear={(gearFromOCR) => {
            gearComparerState.loadoutsState.selectedLoadout.gearSet.setGear(
              gearFromOCR
            );
            gearComparerState.selectedGearTypeId = gearFromOCR.type.id;
          }}
        />
      }
      showStatSummary={elementalType}
      data-testid={'loadout-gear'}
    />
  );
}
