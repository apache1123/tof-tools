import { useSnapshot } from 'valtio';

import type { GearSet } from '../../models/gear-set';
import { loadoutsState } from '../../states/loadouts';
import { GearSetStatSummary } from '../GearSetStatSummary';

export function LoadoutGearSetStatSummary() {
  const {
    selectedLoadout: { gearSet, elementalType },
  } = useSnapshot(loadoutsState);
  return (
    <GearSetStatSummary
      gearSetSnap={gearSet as GearSet}
      elementalType={elementalType}
    />
  );
}
