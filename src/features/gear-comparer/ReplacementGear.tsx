import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import { gearTypesLookup } from '../../definitions/gear-types';
import type { Gear } from '../../models/gear';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';
import { GearRollSimulator } from './GearRollSimulator';
import { SaveGearModal } from './SaveGearModal';

export function ReplacementGear({
  maxTitanGear,
}: {
  maxTitanGear: Gear | undefined;
}) {
  const {
    replacementGear: gearSnap,
    replacementGearGearSet,
    loadoutsState: {
      selectedLoadout: { elementalType },
    },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const gearState = gearComparerState.replacementGear;

  const gearTypeSelectorOptions = gearTypesLookup.allIds.map((id) => ({
    gearType: gearTypesLookup.byId[id],
    isTitan: replacementGearGearSet.getGearByType(id).isAugmented,
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
        <>
          <SaveGearModal
            gear={gearState}
            targetLoadout={gearComparerState.loadoutsState.selectedLoadout}
          />
          <GearOCRModal
            onFinalizeGear={(gearFromOCR) => {
              gearComparerState.replacementGearGearSet.setGear(gearFromOCR);
              gearComparerState.selectedGearTypeId = gearFromOCR.type.id;
            }}
          />
        </>
      }
      showTitanToggle
      showStatSummary={elementalType}
      showMaxTitanGear={{ maxTitanGear }}
      additionalAccordions={<GearRollSimulator />}
      data-testid={'replacement-gear'}
    />
  );
}
