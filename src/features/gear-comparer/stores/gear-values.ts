import BigNumber from 'bignumber.js';
import { derive, devtools } from 'valtio/utils';

import { defaultCritDamagePercent } from '../../../constants/damage-formula';
import {
  type Gear,
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
  getTotalDamagePercent,
} from '../../../models/gear';
import type { CoreElementalType } from '../../../models/stat-type';
import { additiveSum } from '../../../utils/math-utils';
import type {
  GearComparerGearPosition,
  GearComparerGearsStore,
} from './gear-comparer-gear';
import { gearComparerGearsStore } from './gear-comparer-gear';
import type { SelectedBuffsStore } from './selected-buffs';
import { selectedBuffsStore } from './selected-buffs';
import type { UserStatsStore } from './user-stats';
import { userStatsStore } from './user-stats';

export type GearValuesStore = Record<
  `${GearComparerGearPosition}Value`,
  number
>;

export const gearValuesStore = derive<object, GearValuesStore>({
  GearAValue: (get) => {
    return getGearValue(
      'GearA',
      get(gearComparerGearsStore),
      get(userStatsStore),
      get(selectedBuffsStore)
    );
  },
  GearBValue: (get) => {
    return getGearValue(
      'GearB',
      get(gearComparerGearsStore),
      get(userStatsStore),
      get(selectedBuffsStore)
    );
  },
});
devtools(gearValuesStore, { name: 'gearValues' });

function getGearValue(
  gearPosition: GearComparerGearPosition,
  gearComparerGearsStore: GearComparerGearsStore,
  userStatsStore: UserStatsStore,
  selectedBuffsStore: SelectedBuffsStore
) {
  const gear = gearComparerGearsStore[gearPosition];
  if (!gear) return 0;

  const {
    elementalType,
    otherAttackFlat,
    critFlat,
    characterLevel,
    otherGearAttackPercent,
    otherGearElementalDamage,
    miscAttackPercent,
    miscCritRate,
    miscCritDamage,
  } = userStatsStore;

  if (!elementalType) {
    return 0;
  }

  const {
    weaponAttackBuffValues,
    matrixAttackBuffValues,
    weaponCritRateBuffValues,
    matrixCritRateBuffValues,
    matrixCritDamageBuffValues,
  } = selectedBuffsStore;

  const allOtherAttackPercents = [otherGearAttackPercent, miscAttackPercent]
    .concat(weaponAttackBuffValues)
    .concat(matrixAttackBuffValues);

  const allOtherCritRates = [miscCritRate]
    .concat(weaponCritRateBuffValues)
    .concat(matrixCritRateBuffValues);

  const allOtherCritDamages = [miscCritDamage].concat(
    matrixCritDamageBuffValues
  );

  const allOtherDamages = [otherGearElementalDamage];

  return calculateGearValue(
    gear,
    elementalType,
    characterLevel,
    [otherAttackFlat],
    allOtherAttackPercents,
    [critFlat],
    allOtherCritRates,
    allOtherCritDamages,
    allOtherDamages
  );
}

function calculateGearValue(
  gear: Gear,
  elementalType: CoreElementalType,
  charLevel = 0,
  otherAttackFlat = [0],
  otherAttackPercent = [0],
  otherCritFlat = [0],
  otherCritPercent = [0],
  otherCritDamagePercent = [0],
  otherDamagePercent = [0]
): number {
  if (!gear) return 0;

  const bCharLevel = BigNumber(charLevel);
  const otherAttackFlatSum = additiveSum(otherAttackFlat);
  const otherAttackPercentSum = additiveSum(otherAttackPercent);
  const otherCritFlatSum = additiveSum(otherCritFlat);
  const otherCritPercentSum = additiveSum(otherCritPercent);
  const otherCritDamagePercentSum = additiveSum(otherCritDamagePercent);
  const otherDamagePercentSum = additiveSum(otherDamagePercent);

  const totalAttackFlatWithoutGear = otherAttackFlatSum;
  const totalAttackPercentWithoutGear = otherAttackPercentSum;
  const totalCritPercentWithoutGear = calculateCritPercentFromFlat(
    otherCritFlatSum,
    bCharLevel
  ).plus(otherCritPercentSum);
  const totalCritDamagePercentWithoutGear = defaultCritDamagePercent.plus(
    otherCritDamagePercentSum
  );
  const totalDamagePercentWithoutGear = otherDamagePercentSum;

  const multiplierWithoutGear = calculateMultiplier(
    totalAttackFlatWithoutGear,
    totalAttackPercentWithoutGear,
    totalCritPercentWithoutGear,
    totalCritDamagePercentWithoutGear,
    totalDamagePercentWithoutGear
  );

  const totalAttackFlatWithGear = totalAttackFlatWithoutGear.plus(
    getTotalAttackFlat(gear, elementalType)
  );
  const totalAttackPercentWithGear = totalAttackPercentWithoutGear.plus(
    getTotalAttackPercent(gear, elementalType)
  );
  const totalCritPercentWithGear = totalCritPercentWithoutGear
    .plus(
      calculateCritPercentFromFlat(
        BigNumber(getTotalCritFlat(gear)),
        bCharLevel
      )
    )
    .plus(getTotalCritPercent(gear));
  const totalCritDamagePercentWithGear = totalCritDamagePercentWithoutGear;
  const totalDamagePercentWithGear = totalDamagePercentWithoutGear.plus(
    getTotalDamagePercent(gear, elementalType)
  );

  const multiplierWithGear = calculateMultiplier(
    totalAttackFlatWithGear,
    totalAttackPercentWithGear,
    totalCritPercentWithGear,
    totalCritDamagePercentWithGear,
    totalDamagePercentWithGear
  );

  return multiplierWithGear.dividedBy(multiplierWithoutGear).toNumber();
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
