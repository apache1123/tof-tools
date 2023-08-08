import { useSnapshot } from 'valtio';

import type { Gear } from '../../models/gear';
import { newGear } from '../../models/gear';
import type { GearType } from '../../models/gear-type';
import { EmptyGearPiece, GearPiece } from '../GearPiece';
import { TitanGearMaxStats } from '../TitanGearMaxStats';
import { GearRollSimulator } from './GearRollSimulator';
import { gearComparerGearMaxTitansStore } from './stores/derived/gear-comparer-gear-max-titans';
import type { GearComparerGearPosition } from './stores/gear-comparer-gear';
import { gearComparerGearsStore, setGear } from './stores/gear-comparer-gear';
import { gearComparerOptionsStore } from './stores/gear-comparer-options';

export interface GearComparerGearProps {
  position: GearComparerGearPosition;
}

export function GearComparerGear({ position }: GearComparerGearProps) {
  const { [position]: gear } = gearComparerGearsStore;
  const { [position]: gearSnap } = useSnapshot(gearComparerGearsStore);
  const { selectedElementalType } = useSnapshot(gearComparerOptionsStore);
  const maxTitans = useSnapshot(gearComparerGearMaxTitansStore);

  const handleGearTypeSelect = (gearType: GearType) => {
    const gear = newGear(gearType);
    setGear(position, gear);
  };

  const handleNewGear = (gear: Gear) => {
    setGear(position, gear);
  };

  return gearSnap && gear ? (
    <GearPiece
      gear={gear}
      showGearOCRButton
      showSaveGearButton
      showStatSummary={selectedElementalType}
      maxTitanStatsContent={
        gearSnap &&
        maxTitans.titansByReferenceGearId[gearSnap.id] && (
          <TitanGearMaxStats
            maxTitanGear={
              maxTitans.titansByReferenceGearId[gearSnap.id] as Gear
            }
          />
        )
      }
      additionalAccordions={position === 'GearB' && <GearRollSimulator />}
    />
  ) : (
    <EmptyGearPiece
      onGearTypeSelect={handleGearTypeSelect}
      showGearOCRButton
      onReplaceGear={handleNewGear}
    />
  );
}
