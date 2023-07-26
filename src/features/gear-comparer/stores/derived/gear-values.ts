import BigNumber from 'bignumber.js';
import { derive, devtools } from 'valtio/utils';

import { defaultCritDamagePercent } from '../../../../constants/damage-formula';
import {
  type Gear,
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
  getTotalDamagePercent,
} from '../../../../models/gear';
import type { CoreElementalType } from '../../../../models/stat-type';
import { additiveSum } from '../../../../utils/math-utils';
import type {
  GearComparerGearPosition,
  GearComparerGearsStore,
} from '../gear-comparer-gear';
import { gearComparerGearsStore } from '../gear-comparer-gear';
import type { GearComparerOptionsStore } from '../gear-comparer-options';
import { gearComparerOptionsStore } from '../gear-comparer-options';
import type { UserStatsStore } from '../user-stats';
import { userStatsStore } from '../user-stats';
import type { SelectedElementalBuffValuesStore } from './selected-elemental-buff-values';
import { selectedElementalBuffValuesStore } from './selected-elemental-buff-values';
import type { SelectedElementalUserStatsStore } from './selected-elemental-user-stats';
import { selectedElementalUserStatsStore } from './selected-elemental-user-stats';

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
      get(selectedElementalUserStatsStore),
      get(userStatsStore),
      get(selectedElementalBuffValuesStore)
    );
  },
  GearBValue: (get) => {
    return getGearValue(
      'GearB',
      get(gearComparerGearsStore),
      get(gearComparerOptionsStore),
      get(selectedElementalUserStatsStore),
      get(userStatsStore),
      get(selectedElementalBuffValuesStore)
    );
  },
});
devtools(gearValuesStore, { name: 'gearValues' });

function getGearValue(
  gearPosition: GearComparerGearPosition,
  gearComparerGearsStore: GearComparerGearsStore,
  gearComparerOptionsStore: GearComparerOptionsStore,
  selectedElementalUserStatsStore: SelectedElementalUserStatsStore,
  userStatsStore: UserStatsStore,
  selectedElementalBuffValuesStore: SelectedElementalBuffValuesStore
) {
  const gear = gearComparerGearsStore[gearPosition];
  if (!gear) return 0;

  const { selectedElementalType } = gearComparerOptionsStore;
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;

  if (!selectedElementalType || !selectedElementalUserStats) {
    return 0;
  }

  const { characterLevel } = userStatsStore;
  const {
    baseAttackFlatWithGearA,
    totalAttackFlatWithGearA,
    critFlatWithGearA,
    critPercentWithGearA,
    critDamageWithGearA,
    otherGearElementalDamage,
    miscAttackPercent,
    miscCritRate,
    miscCritDamage,
  } = selectedElementalUserStats;

  const passiveAttackPercentWithGearA = BigNumber(totalAttackFlatWithGearA)
    .minus(baseAttackFlatWithGearA)
    .dividedBy(baseAttackFlatWithGearA);

  const gearA = gearComparerGearsStore.GearA;
  const baseAttackFlatWithoutGearA = BigNumber(baseAttackFlatWithGearA)
    .minus(gearA ? getTotalAttackFlat(gearA, selectedElementalType) : 0)
    .toNumber();
  const passiveAttackPercentWithoutGearA = passiveAttackPercentWithGearA
    .minus(gearA ? getTotalAttackPercent(gearA, selectedElementalType) : 0)
    .toNumber();
  const critFlatWithoutGearA = BigNumber(critFlatWithGearA)
    .minus(gearA ? getTotalCritFlat(gearA) : 0)
    .toNumber();
  const critPercentWithoutGearA = BigNumber(critPercentWithGearA)
    .minus(gearA ? getTotalCritPercent(gearA) : 0)
    .toNumber();
  const critDamageWithoutGearA = critDamageWithGearA;

  const {
    weaponAttackBuffValues,
    matrixAttackBuffValues,
    weaponCritRateBuffValues,
    matrixCritRateBuffValues,
    matrixCritDamageBuffValues,
  } = selectedElementalBuffValuesStore;

  const allOtherAttackPercents = [
    passiveAttackPercentWithoutGearA,
    miscAttackPercent,
  ]
    .concat(weaponAttackBuffValues)
    .concat(matrixAttackBuffValues);

  const allOtherCritRates = [critPercentWithoutGearA, miscCritRate]
    .concat(weaponCritRateBuffValues)
    .concat(matrixCritRateBuffValues);

  const allOtherCritDamages = [critDamageWithoutGearA, miscCritDamage].concat(
    matrixCritDamageBuffValues
  );

  const allOtherDamages = [otherGearElementalDamage];

  return calculateGearValue(
    gear,
    selectedElementalType,
    characterLevel,
    [baseAttackFlatWithoutGearA],
    allOtherAttackPercents,
    [critFlatWithoutGearA],
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
  const totalCritDamagePercentWithoutGear = otherCritDamagePercentSum;
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
