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
import { gearBasisValuesStore } from './stores/derived/gear-basis-values';
import {
  selectedElementalUserStatsStore,
  setBaseAttackFlatWithGearA,
  setCritFlatWithGearA,
  setCritPercentWithGearA,
  setTotalAttackFlatWithGearA,
} from './stores/derived/selected-elemental-user-stats';
import { gearComparerGearsStore } from './stores/gear-comparer-gear';
import { gearComparerOptionsStore } from './stores/gear-comparer-options';

export function GearComparerGearSwap() {
  return (
    <Button onClick={swapGear} color="primary" startIcon={<SwapHorizIcon />}>
      Swap Current & New
    </Button>
  );
}

function swapGear() {
  const oldGearA = gearComparerGearsStore.GearA;
  const oldGearB = gearComparerGearsStore.GearB;

  gearComparerGearsStore.GearA = oldGearB;
  gearComparerGearsStore.GearB = oldGearA;

  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  const { selectedElementalType } = gearComparerOptionsStore;
  if (oldGearB && selectedElementalType && selectedElementalUserStats) {
    const {
      basisValues: {
        basisAttackFlat,
        basisCritFlat,
        basisPassiveAttackPercent,
        basisPassiveCritPercent,
      },
    } = gearBasisValuesStore;

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
