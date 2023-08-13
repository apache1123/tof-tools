import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Button } from '@mui/material';
import BigNumber from 'bignumber.js';

import {
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
} from '../../models/gear';
import { additiveSum } from '../../utils/math-utils';
import { gearBasisValuesState } from './states/derived/gear-basis-values';
import {
  selectedElementalUserStatsState,
  setBaseAttackFlatWithGearA,
  setCritFlatWithGearA,
  setCritPercentWithGearA,
  setTotalAttackFlatWithGearA,
} from './states/derived/selected-elemental-user-stats';
import { gearComparerGearsState } from './states/gear-comparer-gear';
import { gearComparerOptionsState } from './states/gear-comparer-options';

export function GearComparerGearSwap() {
  return (
    <Button onClick={swapGear} color="primary" startIcon={<SwapHorizIcon />}>
      Swap Current & New
    </Button>
  );
}

function swapGear() {
  const oldGearA = gearComparerGearsState.GearA;
  const oldGearB = gearComparerGearsState.GearB;

  gearComparerGearsState.GearA = oldGearB;
  gearComparerGearsState.GearB = oldGearA;

  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  const { selectedElementalType } = gearComparerOptionsState;
  if (oldGearB && selectedElementalType && selectedElementalUserStats) {
    const {
      basisValues: {
        basisAttackFlat,
        basisCritFlat,
        basisPassiveAttackPercent,
        basisPassiveCritPercent,
      },
    } = gearBasisValuesState;

    const baseAttackFlatWithGear = additiveSum([
      basisAttackFlat,
      getTotalAttackFlat(oldGearB, selectedElementalType),
    ]);
    const attackPercentWithGear = additiveSum([
      basisPassiveAttackPercent,
      getTotalAttackPercent(oldGearB, selectedElementalType),
    ]);

    const totalAttackFlatWithGear = BigNumber(baseAttackFlatWithGear).times(
      attackPercentWithGear.plus(1)
    );

    const critFlatWithGear = additiveSum([
      basisCritFlat,
      getTotalCritFlat(oldGearB),
    ]);
    const critPercentWithGear = additiveSum([
      basisPassiveCritPercent,
      getTotalCritPercent(oldGearB),
    ]);

    setBaseAttackFlatWithGearA(baseAttackFlatWithGear.toNumber());
    setTotalAttackFlatWithGearA(totalAttackFlatWithGear.toNumber());
    setCritFlatWithGearA(critFlatWithGear.toNumber());
    setCritPercentWithGearA(critPercentWithGear.toNumber());
  }
}
