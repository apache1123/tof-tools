import { useSnapshot } from "valtio";

import { CoreElementalTypeSelector } from "../../components/CoreElementalTypeSelector/CoreElementalTypeSelector";
import { loadoutsState } from "../../states/states";

export function LoadoutElementalType() {
  const {
    selectedLoadoutItem: { loadout, isDefault },
  } = useSnapshot(loadoutsState);

  return (
    <CoreElementalTypeSelector
      elementalType={loadout.elementalType}
      onElementalTypeChange={(elementalType) => {
        loadoutsState.selectedLoadoutItem.loadout.elementalType = elementalType;
      }}
      label={loadout.elementalType ? null : "Element type"}
      size="small"
      variant="outlined"
      required={!loadout.elementalType}
      disabled={isDefault}
    />
  );
}
