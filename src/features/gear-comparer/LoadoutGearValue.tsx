import { useSnapshot } from "valtio";

import { gearComparerState } from "../../states/states";
import { GearValue } from "../GearValue";

export interface LoadoutGearValueProps {
  maxTitanGearValue: number | undefined;
  isMaxTitanGearValueHigher: boolean | undefined;
}

export function LoadoutGearValue({
  maxTitanGearValue,
  isMaxTitanGearValueHigher,
}: LoadoutGearValueProps) {
  const { selectedLoadoutGearValue, replacementGearValue } =
    useSnapshot(gearComparerState);

  return (
    <GearValue
      gearValue={selectedLoadoutGearValue}
      isGearValueHigher={selectedLoadoutGearValue > replacementGearValue}
      titanGearValue={maxTitanGearValue}
      isTitanGearValueHigher={isMaxTitanGearValueHigher}
      data-testid="loadout-gear"
    />
  );
}
