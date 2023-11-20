import { useSnapshot } from 'valtio';

import { gearComparerState } from '../../states/states';
import { GearValue } from '../GearValue';
import { maxTitanGearValuesState } from './states/derived/max-titan-gear-values';
import { maxTitanGearValuesComparisonState } from './states/derived/max-titan-gear-values-comparison';

export function ReplacementGearValue() {
  const {
    replacementGearValue: replacementGearDamageMultiplier,
    selectedLoadoutGearValue: selectedLoadoutGearDamageMultiplier,
  } = useSnapshot(gearComparerState);
  const { replacementGearMaxTitanValue } = useSnapshot(maxTitanGearValuesState);
  const { replacementGearMaxTitanHighestValue } = useSnapshot(
    maxTitanGearValuesComparisonState
  );

  return (
    <GearValue
      gearValue={replacementGearDamageMultiplier}
      isGearValueHigher={
        replacementGearDamageMultiplier > selectedLoadoutGearDamageMultiplier
      }
      titanGearValue={replacementGearMaxTitanValue}
      isTitanGearValueHigher={replacementGearMaxTitanHighestValue}
    />
  );
}
