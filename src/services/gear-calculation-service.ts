import BigNumber from 'bignumber.js';

import { Gear } from '../models/gear';
import {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from '../models/gear-random-stat-roll-combinations';
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
            randomStatName: randomStat.type.name,
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
    elementalType: ElementalType,
    baseAttack = 0,
    critFlat = 0,
    charLevel = 0,
    elementalAttackPercent = 0,
    critPercent = 0,
    critDamagePercent = 0,
    damagePercent = 0
  ): number {
    if (!gear) return 0;

    const bBaseAttack = BigNumber(baseAttack);
    const bCritFlat = BigNumber(critFlat);
    const bCharLevel = BigNumber(charLevel);
    const bElementalAttackPercent = BigNumber(elementalAttackPercent);
    const bCritPercent = BigNumber(critPercent);
    const bCritDamagePercent = BigNumber(critDamagePercent);
    const bDamagePercent = BigNumber(damagePercent);

    const attackFlatFromGear = calculateAttackFlatFromGear(gear, elementalType);
    const totalAttackFlat = bBaseAttack.plus(attackFlatFromGear);

    const attackPercentFromGear = calculateAttackPercentFromGear(
      gear,
      elementalType
    );
    const totalAttackPercent = bElementalAttackPercent.plus(
      attackPercentFromGear
    );

    const critFlatFromGear = calculateCritFlatFromGear(gear);
    const totalCritFlat = bCritFlat.plus(critFlatFromGear);
    const critPercentFromFlat = calculateCritPercentFromFlat(
      totalCritFlat,
      bCharLevel
    );

    const critPercentFromGear = calculateCritPercentFromGear(gear);
    const totalCritPercent = bCritPercent
      .plus(critPercentFromFlat)
      .plus(critPercentFromGear);

    const totalCritDamagePercent =
      defaultCritDamagePercent.plus(bCritDamagePercent);

    const damagePercentFromGear = calculateDamagePercentFromGear(gear);
    const totalDamagePercent = bDamagePercent.plus(damagePercentFromGear);

    const multiplierWithoutGear = calculateMultiplier(
      bBaseAttack,
      bElementalAttackPercent,
      bCritPercent.plus(critPercentFromFlat),
      totalCritDamagePercent,
      bDamagePercent
    );

    const multiplierWithGear = calculateMultiplier(
      totalAttackFlat,
      totalAttackPercent,
      totalCritPercent,
      totalCritDamagePercent,
      totalDamagePercent
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
  elementalType: ElementalType
): BigNumber {
  return gear.randomStats
    .filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.Attack &&
        !randomStat.type?.isPercentageBased &&
        (randomStat.type?.elementalType === elementalType ||
          randomStat.type?.elementalType === ElementalType.All)
    )
    .map((randomStat) =>
      randomStat.value ? BigNumber(randomStat.value) : BigNumber(0)
    )
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}

function calculateAttackPercentFromGear(
  gear: Gear,
  elementalType: ElementalType
): BigNumber {
  return gear.randomStats
    .filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.AttackPercent &&
        randomStat.type?.isPercentageBased &&
        (randomStat.type?.elementalType === elementalType ||
          randomStat.type?.elementalType === ElementalType.All)
    )
    .map((randomStat) =>
      randomStat.value ? BigNumber(randomStat.value) : BigNumber(0)
    )
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}

function calculateCritFlatFromGear(gear: Gear): BigNumber {
  return gear.randomStats
    .filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.Crit &&
        !randomStat.type?.isPercentageBased &&
        randomStat.type?.elementalType === ElementalType.All
    )
    .map((randomStat) =>
      randomStat.value ? BigNumber(randomStat.value) : BigNumber(0)
    )
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}

function calculateCritPercentFromGear(gear: Gear): BigNumber {
  return gear.randomStats
    .filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.CritPercent &&
        randomStat.type?.isPercentageBased &&
        randomStat.type?.elementalType === ElementalType.All
    )
    .map((randomStat) =>
      randomStat.value ? BigNumber(randomStat.value) : BigNumber(0)
    )
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}

function calculateDamagePercentFromGear(gear: Gear): BigNumber {
  return gear.randomStats
    .filter(
      (randomStat) =>
        randomStat.type?.role === StatRole.DamagePercent &&
        randomStat.type?.isPercentageBased &&
        randomStat.type?.elementalType === ElementalType.All
    )
    .map((randomStat) =>
      randomStat.value ? BigNumber(randomStat.value) : BigNumber(0)
    )
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
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
