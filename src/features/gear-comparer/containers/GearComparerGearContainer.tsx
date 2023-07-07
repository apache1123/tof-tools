import { useSnapshot } from 'valtio';

import type { Gear } from '../../../models/gear';
import { copyGear, newGear } from '../../../models/gear';
import type { GearType } from '../../../models/gear-type';
import { EmptyGearPiece, GearPiece } from '../../GearPiece';
import type { GearComparerGearPosition } from '../stores/gear-comparer-gear';
import { gearComparerGearsStore, setGear } from '../stores/gear-comparer-gear';

export interface GearComparerGearContainerProps {
  position: GearComparerGearPosition;
}

export function GearComparerGearContainer({
  position,
}: GearComparerGearContainerProps) {
  const { [position]: gear } = gearComparerGearsStore;
  const { [position]: gearSnap } = useSnapshot(gearComparerGearsStore);

  const handleGearTypeSelect = (gearType: GearType) => {
    const gear = newGear(gearType);
    setGear(position, gear);
  };

  const handleNewGear = (gear: Gear) => {
    setGear(position, gear);
  };

  const handleReplaceExistingGear = (replacementGear: Gear) => {
    if (gear) copyGear(replacementGear, gear);
  };

  return gearSnap && gear ? (
    <GearPiece
      gear={gear}
      showGearOCRButton
      onReplaceGear={handleReplaceExistingGear}
    />
  ) : (
    <EmptyGearPiece
      onGearTypeSelect={handleGearTypeSelect}
      showGearOCRButton
      onReplaceGear={handleNewGear}
    />
  );
}
