import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import { gearTypesLookup } from '../../constants/gear-types';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';
import { GearRollSimulator } from './GearRollSimulator';
import { SaveGearModal } from './SaveGearModal';

export function ReplacementGear() {
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
          <GearOCRModal
            onFinalizeGear={(gearFromOCR) => {
              gearComparerState.replacementGearGearSet.setGear(gearFromOCR);
              gearComparerState.selectedGearTypeId = gearFromOCR.type.id;
            }}
          />
          <SaveGearModal
            gear={gearState}
            targetLoadout={gearComparerState.loadoutsState.selectedLoadout}
          />
        </>
      }
      showTitanToggle
      showStatSummary={elementalType}
      additionalAccordions={<GearRollSimulator />}
      data-testid={'replacement-gear'}
    />
  );
}
