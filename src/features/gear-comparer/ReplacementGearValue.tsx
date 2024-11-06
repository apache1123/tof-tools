import { useSnapshot } from "valtio";

import { gearComparerState } from "../../states/states";
import { GearValue } from "../GearValue";

export interface ReplacementGearValueProps {
  maxTitanGearValue: number | undefined;
  isMaxTitanGearValueHigher: boolean | undefined;
}

export function ReplacementGearValue({
  maxTitanGearValue,
  isMaxTitanGearValueHigher,
}: ReplacementGearValueProps) {
  const {
    replacementGearValue: replacementGearDamageMultiplier,
    selectedLoadoutGearValue: selectedLoadoutGearDamageMultiplier,
  } = useSnapshot(gearComparerState);

  return (
    <GearValue
      gearValue={replacementGearDamageMultiplier}
      isGearValueHigher={
        replacementGearDamageMultiplier > selectedLoadoutGearDamageMultiplier
      }
      titanGearValue={maxTitanGearValue}
      isTitanGearValueHigher={isMaxTitanGearValueHigher}
      data-testid="replacement-gear"
    />
  );
}
