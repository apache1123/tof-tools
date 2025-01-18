import { useProxy } from "valtio/utils";

import { GearTypeToggle } from "../../components/gear/GearTypeToggle/GearTypeToggle";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";

export function SelectGearType() {
  const $state = useProxy(gearCompareState);
  const { gearTypeId } = $state;

  return (
    <GearTypeToggle
      values={gearTypeId ? [gearTypeId] : []}
      exclusive
      enforceAtLeastOne
      onChange={(gearTypeIds) => {
        $state.gearTypeId = gearTypeIds[0];
      }}
    />
  );
}
