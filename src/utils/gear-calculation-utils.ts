import BigNumber from 'bignumber.js';

import type { CoreElementalType } from '../constants/elemental-type';
import type { BasisValues } from '../models/basis-values';
import type { Gear } from '../models/gear';
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
    gear.getTotalAttackFlat(selectedElementalType)
  );
  const totalAttackPercentWithGear = BigNumber(basisAttackPercent).plus(
    gear.getTotalAttackPercent(selectedElementalType)
  );
  const totalCritPercentWithGear = BigNumber(basisCritTotalPercent)
    .plus(calculateCritPercentFromFlat(gear.getTotalCritFlat(), characterLevel))
    .plus(gear.getTotalCritPercent());
  const totalCritDamagePercentWithGear = BigNumber(basisCritDamage);
  const totalDamagePercentWithGear = BigNumber(basisDamage).plus(
    gear.getTotalDamagePercent(selectedElementalType)
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
