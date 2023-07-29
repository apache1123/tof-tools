import BigNumber from 'bignumber.js';
import { derive, devtools } from 'valtio/utils';

import {
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
  getTotalDamagePercent,
} from '../../../../models/gear';
import type {
  GearComparerGearPosition,
  GearComparerGearsStore,
} from '../gear-comparer-gear';
import { gearComparerGearsStore } from '../gear-comparer-gear';
import type { GearComparerOptionsStore } from '../gear-comparer-options';
import { gearComparerOptionsStore } from '../gear-comparer-options';
import type { UserStatsStore } from '../user-stats/user-stats';
import { userStatsStore } from '../user-stats/user-stats';
import {
  type GearBasisValuesStore,
  gearBasisValuesStore,
} from './gear-basis-values';

export type GearValuesStore = Record<
  `${GearComparerGearPosition}Value`,
  number
>;

export const gearValuesStore = derive<object, GearValuesStore>({
  GearAValue: (get) => {
    return getGearValue(
      'GearA',
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(userStatsStore),
      get(gearBasisValuesStore)
    );
  },
  GearBValue: (get) => {
    return getGearValue(
      'GearB',
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(userStatsStore),
      get(gearBasisValuesStore)
    );
  },
});
devtools(gearValuesStore, { name: 'gearValues' });

function getGearValue(
  gearPosition: GearComparerGearPosition,
  gearComparerGearsStore: GearComparerGearsStore,
  gearComparerOptionsStore: GearComparerOptionsStore,
  userStatsStore: UserStatsStore,
  gearBasisValuesStore: GearBasisValuesStore
) {
  const gear = gearComparerGearsStore[gearPosition];
  if (!gear) return 0;

  const { selectedElementalType } = gearComparerOptionsStore;

  if (!selectedElementalType) {
    return 0;
  }

  const { characterLevel } = userStatsStore;

  const {
    basisValues: {
      basisAttackFlat,
      basisAttackPercent,
      basisCritFlat,
      basisCritPercent,
      basisCritDamage,
      basisDamage,
    },
  } = gearBasisValuesStore;
  const totalBasisCritPercent = calculateCritPercentFromFlat(
    BigNumber(basisCritFlat),
    BigNumber(characterLevel)
  ).plus(basisCritPercent);

  const multiplierWithoutGear = calculateMultiplier(
    BigNumber(basisAttackFlat),
    BigNumber(basisAttackPercent),
    totalBasisCritPercent,
    BigNumber(basisCritDamage),
    BigNumber(basisDamage)
  );

  const totalAttackFlatWithGear = BigNumber(basisAttackFlat).plus(
    getTotalAttackFlat(gear, selectedElementalType)
  );
  const totalAttackPercentWithGear = BigNumber(basisAttackPercent).plus(
    getTotalAttackPercent(gear, selectedElementalType)
  );
  const totalCritPercentWithGear = totalBasisCritPercent
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

  return multiplierWithGear
    .dividedBy(multiplierWithoutGear)
    .minus(1)
    .toNumber();
}

function calculateCritPercentFromFlat(
  critFlat: BigNumber,
  charLevel: BigNumber
): BigNumber {
  // Rough crit formula from maygi spreadsheet
  // Crit % = Crit flat / (a * lvl^2 + b * lvl + c)
  const a = BigNumber(-3.71);
  const b = BigNumber(1151);
  const c = BigNumber(-49787);

  const critPercent = critFlat.dividedBy(
    a
      .multipliedBy(charLevel.exponentiatedBy(2))
      .plus(b.multipliedBy(charLevel))
      .plus(c)
  );
  return critPercent;
}

function calculateMultiplier(
  attackFlat: BigNumber,
  attackPercent: BigNumber,
  critPercent: BigNumber,
  critDamagePercent: BigNumber,
  damagePercent: BigNumber
) {
  return attackFlat
    .multipliedBy(attackPercent.plus(1))
    .multipliedBy(critPercent.multipliedBy(critDamagePercent).plus(1))
    .multipliedBy(damagePercent.plus(1));
}
