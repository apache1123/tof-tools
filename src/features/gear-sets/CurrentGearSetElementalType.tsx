import { useSnapshot } from 'valtio';

import { CoreElementalTypeSelector } from '../../components/CoreElementalTypeSelector/CoreElementalTypeSelector';
import {
  gearSetsStore,
  setSelectedGearSetElementalType,
} from './stores/gear-sets';

export function CurrentGearSetElementalType() {
  const { selectedGearSet } = useSnapshot(gearSetsStore);

  if (!selectedGearSet) return null;

  return (
    <CoreElementalTypeSelector
      elementalType={selectedGearSet.elementalType}
      onElementalTypeChange={setSelectedGearSetElementalType}
      size="small"
    />
  );
}