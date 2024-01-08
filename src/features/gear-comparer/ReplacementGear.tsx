import { useSnapshot } from 'valtio';

import { GearTypeSelector } from '../../components/GearTypeSelector/GearTypeSelector';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { GearOCRModal } from '../GearOCRModal';
import { GearPiece } from '../GearPiece';
import { GearRollSimulator } from './GearRollSimulator';
import { SaveGearModal } from './SaveGearModal';

export function ReplacementGear() {
  const {
    replacementGear: gearSnap,
    selectedLoadout: { elementalType },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const gearState = gearComparerState.replacementGear;

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
            gearComparerState.replacementGear.isAugmented = isTitan;
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
            targetLoadout={gearComparerState.selectedLoadout}
          />
        </>
      }
      showStatSummary={elementalType}
      additionalAccordions={<GearRollSimulator />}
      data-testid={'replacement-gear'}
    />
  );
}
