import BigNumber from 'bignumber.js';
import { derive, devtools } from 'valtio/utils';

import { defaultCritDamagePercent } from '../../../constants/damage-formula';
import type { Gear } from '../../../models/gear';
import type { RandomStat } from '../../../models/random-stat';
import { getType } from '../../../models/random-stat';
import { ElementalType, StatRole } from '../../../models/stat-type';
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
  elementalType: ElementalType | undefined,
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
    calculateAttackFlatFromGear(gear, elementalType)
  );
  const totalAttackPercentWithGear = totalAttackPercentWithoutGear.plus(
    calculateAttackPercentFromGear(gear, elementalType)
  );
  const totalCritPercentWithGear = totalCritPercentWithoutGear
    .plus(
      calculateCritPercentFromFlat(calculateCritFlatFromGear(gear), bCharLevel)
    )
    .plus(calculateCritPercentFromGear(gear));
  const totalCritDamagePercentWithGear = totalCritDamagePercentWithoutGear;
  const totalDamagePercentWithGear = totalDamagePercentWithoutGear.plus(
    calculateDamagePercentFromGear(gear, elementalType)
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

function calculateAttackFlatFromGear(
  gear: Gear,
  elementalType: ElementalType | undefined
): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter((randomStat) => {
      if (!randomStat) return false;

      const statType = getType(randomStat);
      return (
        statType.role === StatRole.Attack &&
        !statType.isPercentageBased &&
        (statType.elementalType === elementalType ||
          statType.elementalType === ElementalType.All)
      );
    }) as RandomStat[]
  );
}

function calculateAttackPercentFromGear(
  gear: Gear,
  elementalType: ElementalType | undefined
): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter((randomStat) => {
      if (!randomStat) return false;

      const statType = getType(randomStat);
      return (
        statType.role === StatRole.AttackPercent &&
        statType.isPercentageBased &&
        (statType.elementalType === elementalType ||
          statType.elementalType === ElementalType.All)
      );
    }) as RandomStat[]
  );
}

function calculateCritFlatFromGear(gear: Gear): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter((randomStat) => {
      if (!randomStat) return false;

      const statType = getType(randomStat);
      return (
        statType.role === StatRole.Crit &&
        !statType.isPercentageBased &&
        statType.elementalType === ElementalType.All
      );
    }) as RandomStat[]
  );
}

function calculateCritPercentFromGear(gear: Gear): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter((randomStat) => {
      if (!randomStat) return false;

      const statType = getType(randomStat);
      return (
        statType.role === StatRole.CritPercent &&
        statType.isPercentageBased &&
        statType.elementalType === ElementalType.All
      );
    }) as RandomStat[]
  );
}

function calculateDamagePercentFromGear(
  gear: Gear,
  elementalType: ElementalType | undefined
): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter((randomStat) => {
      if (!randomStat) return false;

      const statType = getType(randomStat);
      return (
        statType.role === StatRole.DamagePercent &&
        statType.isPercentageBased &&
        (statType.elementalType === elementalType ||
          statType.elementalType === ElementalType.All)
      );
    }) as RandomStat[]
  );
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

function sumRandomStatValues(randomStats: RandomStat[]) {
  return additiveSum(randomStats.map((randomStat) => randomStat.value));
}

function additiveSum(values: number[]): BigNumber {
  return values
    .map((value) => BigNumber(value))
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}
