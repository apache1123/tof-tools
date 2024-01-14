import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import type { Gear } from '../../models/gear';
import type { LoadoutsState } from '../../states/loadouts';
import { loadoutsState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';
import { GearValue } from '../GearValue';

export interface LoadoutGearProps {
  gearSnap: Gear;
  gearState: Gear;
}

export function LoadoutGear({ gearSnap, gearState }: LoadoutGearProps) {
  const { selectedLoadout: loadoutSnap } = useSnapshot(
    loadoutsState
  ) as LoadoutsState;

  const {
    selectedLoadoutItem: {
      loadout: { gearSet: gearSetState },
    },
  } = loadoutsState;

  const gearTypeId = gearSnap.type.id;
  const gearValue = loadoutSnap.getGearValue(gearTypeId);

  const maxTitanGear = gearSnap.getMaxTitanGear();
  const maxTitanGearValue = maxTitanGear
    ? loadoutSnap.getSubstituteGearValue(maxTitanGear)
    : undefined;

  return (
    <>
      <GearPiece
        gearSnap={gearSnap}
        gearState={gearState}
        gearTypeSelector={
          <GearTypeSelector
            selectedGearType={gearSnap.type}
            options={[
              { gearType: gearSnap.type, isTitan: gearSnap.isAugmented },
            ]}
            disabled
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
        showTitanToggle
        showStatSummary={loadoutSnap.elementalType}
        data-testid={gearTypeId}
      />
      <GearValue
        gearValue={gearValue}
        data-testid={gearTypeId}
        titanGearValue={maxTitanGearValue}
      />
    </>
  );
}
