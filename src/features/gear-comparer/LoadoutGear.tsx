import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import { gearTypesLookup } from '../../definitions/gear-types';
import type { Gear } from '../../models/gear';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';

export function LoadoutGear({
  maxTitanGear,
}: {
  maxTitanGear: Gear | undefined;
}) {
  const {
    selectedLoadoutGear: gearSnap,
    loadoutsState: {
      selectedLoadout: { elementalType, gearSet },
    },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const gearState = gearComparerState.selectedLoadoutGear;

  const gearTypeSelectorOptions = gearTypesLookup.allIds.map((id) => ({
    gearType: gearTypesLookup.byId[id],
    isTitan: gearSet.getGearByType(id).isAugmented,
  }));

  return (
    <GearPiece
      gearSnap={gearSnap}
      gearState={gearState}
      gearTypeSelector={
        <GearTypeSelector
          selectedGearType={gearSnap.type}
          options={gearTypeSelectorOptions}
          onChange={(gearType) => {
            gearComparerState.selectedGearTypeId = gearType.id;
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
      showTitanToggle
      showStatSummary={elementalType}
      showMaxTitanGear={{ maxTitanGear }}
      data-testid={'loadout-gear'}
    />
  );
}
