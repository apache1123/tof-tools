import { useSnapshot } from 'valtio';

import { CoreElementalTypeSelector } from '../../components/CoreElementalTypeSelector/CoreElementalTypeSelector';
import {
  gearSetsState,
  setSelectedGearSetElementalType,
} from './states/gear-sets';

export function CurrentGearSetElementalType() {
  const { selectedGearSet } = useSnapshot(gearSetsState);

  if (!selectedGearSet) return null;

  return (
    <CoreElementalTypeSelector
      elementalType={selectedGearSet.elementalType}
      onElementalTypeChange={setSelectedGearSetElementalType}
      label={selectedGearSet.elementalType ? null : 'Element type'}
      size="small"
      variant="outlined"
      required={!selectedGearSet.elementalType}
    />
  );
}
