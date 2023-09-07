import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';
import { nanoid } from 'nanoid';

import { prioritizedAugmentationStatTypesLookup } from '../constants/augmentation-stats';
import {
  augmentStatsPullUpFactor1,
  augmentStatsPullUpFactor2,
  augmentStatsPullUpFactor3,
  maxNumOfAugmentStats,
  maxNumOfRandomStatRolls,
} from '../constants/gear';
import { gearTypesLookup } from '../constants/gear-types';
import { statTypesLookup } from '../constants/stat-types';
import { cartesian } from '../utils/array-utils';
import { additiveSum } from '../utils/math-utils';
import { type AugmentStat, newAugmentStat } from './augment-stat';
import { type CoreElementalType, ElementalType } from './elemental-type';
import type {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from './gear-random-stat-roll-combinations';
import type { GearName, GearType } from './gear-type';
import {
  copyRandomStat,
  getMaxAugmentIncrease,
  getRandomStatRollCombinations,
  getTotalValueWithAugment,
  getType as getRandomStatType,
  newRandomStat,
  type RandomStat,
  setAugmentIncreaseValue,
} from './random-stat';
import type { StatName, StatType } from './stat-type';
import {
  isCritFlat,
  isCritPercent,
  isElementalAttackFlat,
  isElementalAttackPercent,
  isElementalDamagePercent,
  StatRole,
} from './stat-type';

export interface Gear {
  id: string;
  typeId: GearName;
  stars: number;
  randomStats: (RandomStat | undefined)[];
  augmentStats: AugmentStat[];
  isAugmented: boolean;
  isTitan: boolean;
}

export function newGear(type: GearType) {
  const gear = {
    id: nanoid(),
    stars: 0,
    randomStats: [],
    augmentStats: [],
    isAugmented: false,
    isTitan: false,
  } as unknown as Gear;
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
  if (stars >= 0 && stars <= maxNumOfRandomStatRolls) {
    gear.stars = stars;
  }
}
export function getPossibleStars(gear: Gear): number[] {
  return Object.keys(
    groupBy(getGearRandomStatRollCombinations(gear), 'stars')
  ).map((x) => +x);
}

export function setIsAugmented(gear: Gear, isAugmented: boolean) {
  gear.isAugmented = isAugmented;
}

export function setIsTitan(gear: Gear, isTitan: boolean) {
  gear.isTitan = isTitan;
}

export function getTotalAttackFlat(
  gear: Gear,
  elementalType: CoreElementalType
): number {
  return additiveSumElementalStatValues(
    gear,
    elementalType,
    isElementalAttackFlat
  );
}

export function getTotalAttackPercent(
  gear: Gear,
  elementalType: CoreElementalType
): number {
  return additiveSumElementalStatValues(
    gear,
    elementalType,
    isElementalAttackPercent
  );
}

export function getTotalCritFlat(gear: Gear): number {
  return additiveSumStatValues(gear, isCritFlat);
}

export function getTotalCritPercent(gear: Gear): number {
  return additiveSumStatValues(gear, isCritPercent);
}

export function getTotalDamagePercent(
  gear: Gear,
  elementalType: CoreElementalType
): number {
  return additiveSumElementalStatValues(
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

export function getMaxTitanGear(
  gear: Gear,
  elementalType?: CoreElementalType
): Gear | undefined {
  if (
    gear.stars !== 5 &&
    !(getPossibleStars(gear).length === 1 && getPossibleStars(gear)[0] === 5)
  ) {
    return undefined;
  }

  const maxTitanGear = newGear(getType(gear));
  copyGear(gear, maxTitanGear);

  const gearStatRollCombinations =
    getGearRandomStatRollCombinations(maxTitanGear);
  if (!gearStatRollCombinations.length) {
    return undefined;
  }

  const rollBreakdown = gearStatRollCombinations[0].randomStatRollCombinations;
  const highestStatName = rollBreakdown.reduce((prev, current) =>
    current.rollCombination.numberOfRolls >
      prev.rollCombination.numberOfRolls ||
    (current.rollCombination.numberOfRolls ===
      prev.rollCombination.numberOfRolls &&
      ((current.rollCombination.rollStrength &&
        prev.rollCombination.rollStrength &&
        current.rollCombination.rollStrength >=
          prev.rollCombination.rollStrength) ||
        current.rollCombination.rollStrength === undefined))
      ? current
      : prev
  ).randomStatId;

  const prioritizedStatNames =
    prioritizedAugmentationStatTypesLookup[highestStatName]
      .prioritizedStatTypes;
  const elementalPrioritizedStatNames = elementalType
    ? prioritizedStatNames.filter(
        (statName) =>
          statTypesLookup.byId[statName].elementalType === elementalType
      )
    : [];
  const fallbackStatNames =
    prioritizedAugmentationStatTypesLookup[highestStatName].fallbackStatTypes;

  fillAugmentStatsIfPossible(elementalPrioritizedStatNames);
  fillAugmentStatsIfPossible(prioritizedStatNames);
  fillAugmentStatsIfPossible(fallbackStatNames);

  setMaxAugmentIncrease(maxTitanGear.randomStats);
  setMaxAugmentIncrease(maxTitanGear.augmentStats);

  pullUpStatsValueIfApplicable();

  setIsAugmented(maxTitanGear, true);
  setIsTitan(maxTitanGear, true);

  return maxTitanGear;

  function fillAugmentStatsIfPossible(statNameCollection: StatName[]) {
    statNameCollection.forEach((statName) => {
      if (
        maxTitanGear.augmentStats.length < maxNumOfAugmentStats &&
        !maxTitanGear.randomStats.some(
          (randomStat) => randomStat?.typeId === statName
        ) &&
        !maxTitanGear.augmentStats.some(
          (augmentStat) => augmentStat.typeId === statName
        )
      ) {
        const statType = statTypesLookup.byId[statName];
        maxTitanGear.augmentStats.push(newAugmentStat(statType));
      }
    });
  }

  function setMaxAugmentIncrease(stats: (RandomStat | undefined)[]) {
    stats.forEach((stat) => {
      if (stat) {
        stat.augmentIncreaseValue = getMaxAugmentIncrease(stat);
      }
    });
  }

  function pullUpStatsValueIfApplicable() {
    const randomStatsAndTypes = maxTitanGear.randomStats
      .filter((randomStat) => randomStat)
      .map((randomStat) => ({
        randomStat,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        statType: getRandomStatType(randomStat),
      }));

    const randomStatsAndTypesByRole = groupBy(
      randomStatsAndTypes,
      'statType.role'
    );

    // Seems only ele atk values get 'pulled up'
    let highestValueWithAugment: number | undefined = undefined;
    Object.keys(randomStatsAndTypesByRole).forEach((role) => {
      if (role === StatRole.Attack) {
        randomStatsAndTypesByRole[role]
          .filter(
            (randomStatAndType) =>
              // Filter out 'Attack'
              randomStatAndType.statType.elementalType !== ElementalType.All
          )
          .sort(
            (a, b) => (b.randomStat?.value ?? 0) - (a.randomStat?.value ?? 0)
          )
          .forEach((randomStatAndType, i) => {
            if (randomStatAndType.randomStat) {
              if (i === 0) {
                highestValueWithAugment = getTotalValueWithAugment(
                  randomStatAndType.randomStat
                );

                return;
              }

              let pullUpFactor: number | undefined = undefined;
              if (i === 1) {
                pullUpFactor = augmentStatsPullUpFactor1;
              } else if (i === 2) {
                pullUpFactor = augmentStatsPullUpFactor2;
              } else if (i === 3) {
                pullUpFactor = augmentStatsPullUpFactor3;
              }

              if (highestValueWithAugment && pullUpFactor) {
                const pullUptoValue = BigNumber(highestValueWithAugment).times(
                  pullUpFactor
                );

                const { randomStat } = randomStatAndType;
                setAugmentIncreaseValue(
                  randomStat,
                  pullUptoValue.minus(randomStat.value).toNumber()
                );
              }
            }
          });
      }
    });

    maxTitanGear.augmentStats.forEach((augmentStat) => {
      const statType = getRandomStatType(augmentStat);
      if (
        highestValueWithAugment &&
        statType.role === StatRole.Attack &&
        // Filter out 'Attack'
        statType.elementalType !== ElementalType.All
      ) {
        const pullUptoValue = BigNumber(highestValueWithAugment).times(
          augmentStatsPullUpFactor1
        );
        setAugmentIncreaseValue(
          augmentStat,
          pullUptoValue.minus(augmentStat.value).toNumber()
        );
      }
    });
  }
}

// Additively sum up all random stat & augment stat values based on a stat type condition
function additiveSumStatValues(
  gear: Gear,
  predicate: (statType: StatType) => boolean
): number {
  return additiveSum(
    gear.randomStats.concat(gear.augmentStats).map((stat) => {
      if (!stat) return 0;

      const statType = getRandomStatType(stat);
      return predicate(statType) ? getTotalValueWithAugment(stat) : 0;
    })
  ).toNumber();
}

// Additively sum up all random stat & augment values based on a stat type & elemental type condition
function additiveSumElementalStatValues(
  gear: Gear,
  elementalType: CoreElementalType,
  predicate: (statType: StatType, elementalType: CoreElementalType) => boolean
): number {
  return additiveSum(
    gear.randomStats.concat(gear.augmentStats).map((stat) => {
      if (!stat) return 0;

      const statType = getRandomStatType(stat);
      return predicate(statType, elementalType)
        ? getTotalValueWithAugment(stat)
        : 0;
    })
  ).toNumber();
}
