import BigNumber from 'bignumber.js';

import type { BasisValues } from '../models/basis-values';
import type { CoreElementalType } from '../models/elemental-type';
import type { Gear } from '../models/gear';
import {
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
  getTotalDamagePercent,
} from '../models/gear';
import {
  calculateCritPercentFromFlat,
  calculateMultiplier,
} from './stat-calculation-utils';

export function getGearMultiplierRelativeToBasis(
  gear: Gear,
  basisValues: BasisValues,
  selectedElementalType: CoreElementalType,
  characterLevel: number
) {
  const {
    basisAttackFlat,
    basisAttackPercent,
    basisCritTotalPercent,
    basisCritDamage,
    basisDamage,
    basisMultiplier,
  } = basisValues;

  const totalAttackFlatWithGear = BigNumber(basisAttackFlat).plus(
    getTotalAttackFlat(gear, selectedElementalType)
  );
  const totalAttackPercentWithGear = BigNumber(basisAttackPercent).plus(
    getTotalAttackPercent(gear, selectedElementalType)
  );
  const totalCritPercentWithGear = BigNumber(basisCritTotalPercent)
    .plus(
      calculateCritPercentFromFlat(
        BigNumber(getTotalCritFlat(gear)),
        BigNumber(characterLevel)
      )
    )
    .plus(getTotalCritPercent(gear));
  const totalCritDamagePercentWithGear = BigNumber(basisCritDamage);
  const totalDamagePercentWithGear = BigNumber(basisDamage).plus(
    getTotalDamagePercent(gear, selectedElementalType)
  );

  const multiplierWithGear = calculateMultiplier(
    totalAttackFlatWithGear,
    totalAttackPercentWithGear,
    totalCritPercentWithGear,
    totalCritDamagePercentWithGear,
    totalDamagePercentWithGear
  );

  return multiplierWithGear.dividedBy(basisMultiplier).minus(1).toNumber();
}
