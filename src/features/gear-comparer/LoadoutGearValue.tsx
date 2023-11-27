import { useSnapshot } from 'valtio';

import { gearComparerState } from '../../states/states';
import { GearValue } from '../GearValue';
import { maxTitanGearValuesState } from './states/derived/max-titan-gear-values';
import { maxTitanGearValuesComparisonState } from './states/derived/max-titan-gear-values-comparison';

export function LoadoutGearValue() {
  const {
    selectedLoadoutGearValue: selectedLoadoutGearDamageMultiplier,
    replacementGearValue: replacementGearDamageMultiplier,
  } = useSnapshot(gearComparerState);
  const { selectedLoadoutGearMaxTitanValue } = useSnapshot(
    maxTitanGearValuesState
  );
  const { selectedLoadoutGearMaxTitanHighestValue } = useSnapshot(
    maxTitanGearValuesComparisonState
  );

  return (
    <GearValue
      gearValue={selectedLoadoutGearDamageMultiplier}
      isGearValueHigher={
        selectedLoadoutGearDamageMultiplier > replacementGearDamageMultiplier
      }
      titanGearValue={selectedLoadoutGearMaxTitanValue}
      isTitanGearValueHigher={selectedLoadoutGearMaxTitanHighestValue}
      data-testid="loadout-gear"
    />
  );
}
