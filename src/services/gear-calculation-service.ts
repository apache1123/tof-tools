import BigNumber from 'bignumber.js';

import { Gear } from '../models/gear';
import {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from '../models/gear-random-stat-roll-combinations';
import { RandomStat } from '../models/random-stat';
import { ElementalType, StatRole } from '../models/stat-type';
import { cartesian } from '../utils/array-utils';
import { statCalculationService } from './stat-calculation-service';

const maxNumOfRandomStatRolls = 5;

const defaultCritDamagePercent = BigNumber(0.5);

export const gearCalculationService = {
  getRandomStatRollCombinations(gear: Gear) {
    const allRandomStatsWithRollCombinations = gear.randomStats.map(
      (randomStat) =>
        statCalculationService.getRandomStatRollCombinations(randomStat).map(
          (rollCombination): RandomStatRollCombination => ({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            randomStatName: randomStat.type!.name,
            rollCombination,
          })
        )
    );

    const allPossibleCombinations: RandomStatRollCombination[][] = cartesian(
      allRandomStatsWithRollCombinations
    );

    // Assuming the roll combinations for each stat is ordered by least number of rolls first
    const minNumOfRollsToCheck =
      gear.stars ??
      allRandomStatsWithRollCombinations
        .map((x) => x[0]?.rollCombination?.numberOfRolls ?? 0)
        .reduce((prev, current) => prev + current, 0);

    const maxNumOfRollsToCheck = gear.stars ?? maxNumOfRandomStatRolls;

    const result: GearRandomStatRollCombinations[] = [];

    for (
      let rolls = minNumOfRollsToCheck;
      rolls <= maxNumOfRollsToCheck;
      rolls++
    ) {
      allPossibleCombinations
        .filter(
          (x) =>
            x
              .map((y) => y.rollCombination.numberOfRolls ?? 0)
              .reduce((prev, current) => prev + current, 0) === rolls
        )
        .forEach((x) =>
          result.push({
            stars: rolls,
            randomStatRollCombinations: x,
          })
        );
    }

    return result;
  },

  getGearValue(
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
        calculateCritPercentFromFlat(
          calculateCritFlatFromGear(gear),
          bCharLevel
        )
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
  },
};

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
    gear.randomStats.filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.Attack &&
        !randomStat.type?.isPercentageBased &&
        (randomStat.type?.elementalType === elementalType ||
          randomStat.type?.elementalType === ElementalType.All)
    )
  );
}

function calculateAttackPercentFromGear(
  gear: Gear,
  elementalType: ElementalType | undefined
): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.AttackPercent &&
        randomStat.type?.isPercentageBased &&
        (randomStat.type?.elementalType === elementalType ||
          randomStat.type?.elementalType === ElementalType.All)
    )
  );
}

function calculateCritFlatFromGear(gear: Gear): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.Crit &&
        !randomStat.type?.isPercentageBased &&
        randomStat.type?.elementalType === ElementalType.All
    )
  );
}

function calculateCritPercentFromGear(gear: Gear): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.CritPercent &&
        randomStat.type?.isPercentageBased &&
        randomStat.type?.elementalType === ElementalType.All
    )
  );
}

function calculateDamagePercentFromGear(
  gear: Gear,
  elementalType: ElementalType | undefined
): BigNumber {
  return sumRandomStatValues(
    gear.randomStats.filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.DamagePercent &&
        randomStat.type?.isPercentageBased &&
        (randomStat.type?.elementalType === elementalType ||
          randomStat.type?.elementalType === ElementalType.All)
    )
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
  return randomStats
    .map((randomStat) =>
      randomStat.value ? BigNumber(randomStat.value) : BigNumber(0)
    )
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}

function additiveSum(values: number[]): BigNumber {
  return values
    .map((value) => BigNumber(value))
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}
