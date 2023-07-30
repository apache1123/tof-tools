import { nanoid } from 'nanoid';

import { maxNumOfRandomStatRolls, maxStars } from '../constants/gear';
import { gearTypesLookup } from '../constants/gear-types';
import { cartesian } from '../utils/array-utils';
import { additiveSum } from '../utils/math-utils';
import type {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from './gear-random-stat-roll-combinations';
import type { GearName, GearType } from './gear-type';
import {
  copyRandomStat,
  getRandomStatRollCombinations,
  getType as getRandomStatType,
  newRandomStat,
  type RandomStat,
} from './random-stat';
import type { CoreElementalType, StatType } from './stat-type';
import {
  isCritFlat,
  isCritPercent,
  isElementalAttackFlat,
  isElementalAttackPercent,
  isElementalDamagePercent,
} from './stat-type';

export interface Gear {
  id: string;
  typeId: GearName;
  stars: number;
  randomStats: (RandomStat | undefined)[];
}

export function newGear(type: GearType) {
  const gear = { id: nanoid(), stars: 0, randomStats: [] } as unknown as Gear;
  setType(gear, type);
  return gear;
}

// Copy all gear properties over except for the id
export function copyGear(fromGear: Gear, toGear: Gear) {
  setType(toGear, getType(fromGear));
  setStars(toGear, fromGear.stars);
  fromGear.randomStats.forEach((fromRandomStat, index) => {
    if (fromRandomStat) {
      if (toGear.randomStats[index]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        copyRandomStat(fromRandomStat, toGear.randomStats[index]!);
      } else {
        const newStat = newRandomStat(getRandomStatType(fromRandomStat));
        copyRandomStat(fromRandomStat, newStat);
        toGear.randomStats[index] = newStat;
      }
    }
  });
}

export function getType(gear: Gear) {
  return gearTypesLookup.byId[gear.typeId];
}
export function setType(gear: Gear, type: GearType) {
  gear.typeId = type.id;

  const randomStats = [...Array(type.numberOfRandomStats)].map(() => undefined);
  gear.randomStats = randomStats;
}

export function setStars(gear: Gear, stars: number) {
  if (stars >= 0 && stars <= maxStars) {
    gear.stars = stars;
  }
}

export function getTotalAttackFlat(
  gear: Gear,
  elementalType: CoreElementalType
): number {
  return additiveSumElementalRandomStatValues(
    gear,
    elementalType,
    isElementalAttackFlat
  );
}

export function getTotalAttackPercent(
  gear: Gear,
  elementalType: CoreElementalType
): number {
  return additiveSumElementalRandomStatValues(
    gear,
    elementalType,
    isElementalAttackPercent
  );
}

export function getTotalCritFlat(gear: Gear): number {
  return additiveSumRandomStatValues(gear, isCritFlat);
}

export function getTotalCritPercent(gear: Gear): number {
  return additiveSumRandomStatValues(gear, isCritPercent);
}

export function getTotalDamagePercent(
  gear: Gear,
  elementalType: CoreElementalType
): number {
  return additiveSumElementalRandomStatValues(
    gear,
    elementalType,
    isElementalDamagePercent
  );
}

export function getGearRandomStatRollCombinations(gear: Gear) {
  const allRandomStatsWithRollCombinations = gear.randomStats.map(
    (randomStat) =>
      randomStat
        ? getRandomStatRollCombinations(randomStat).map(
            (rollCombination): RandomStatRollCombination => ({
              randomStatId: randomStat.typeId,
              rollCombination,
            })
          )
        : []
  );

  const allPossibleCombinations: RandomStatRollCombination[][] = cartesian(
    allRandomStatsWithRollCombinations
  );

  // Assuming the roll combinations for each stat is ordered by least number of rolls first
  const minNumOfRollsToCheck =
    gear.stars ||
    allRandomStatsWithRollCombinations
      .map((x) => x[0]?.rollCombination?.numberOfRolls ?? 0)
      .reduce((prev, current) => prev + current, 0);

  const maxNumOfRollsToCheck = gear.stars || maxNumOfRandomStatRolls;

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
}

// Additively sum up all random stat values based on a stat type condition
function additiveSumRandomStatValues(
  gear: Gear,
  predicate: (statType: StatType) => boolean
): number {
  return additiveSum(
    gear.randomStats.map((stat) => {
      if (!stat) return 0;

      const statType = getRandomStatType(stat);
      return predicate(statType) ? stat.value : 0;
    })
  ).toNumber();
}

// Additively sum up all random stat values based on a stat type & elemental type condition
function additiveSumElementalRandomStatValues(
  gear: Gear,
  elementalType: CoreElementalType,
  predicate: (statType: StatType, elementalType: CoreElementalType) => boolean
): number {
  return additiveSum(
    gear.randomStats.map((stat) => {
      if (!stat) return 0;

      const statType = getRandomStatType(stat);
      return predicate(statType, elementalType) ? stat.value : 0;
    })
  ).toNumber();
}
