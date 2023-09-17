import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';
import { nanoid } from 'nanoid';

import { prioritizedAugmentationStatTypesLookup } from '../constants/augmentation-stats';
import type { CoreElementalType } from '../constants/elemental-type';
import {
  augmentStatsPullUpFactor1,
  augmentStatsPullUpFactor2,
  augmentStatsPullUpFactor3,
  maxNumOfAugmentStats,
  maxNumOfRandomStatRolls,
} from '../constants/gear';
import type { GearName } from '../constants/gear-types';
import { gearTypesLookup } from '../constants/gear-types';
import type { StatName } from '../constants/stat-types';
import { statTypesLookup } from '../constants/stat-types';
import { cartesian } from '../utils/array-utils';
import { additiveSum } from '../utils/math-utils';
import type { AugmentStatDTO } from './augment-stat';
import { AugmentStat } from './augment-stat';
import type {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from './gear-random-stat-roll-combinations';
import type { GearType } from './gear-type';
import type { Persistable } from './persistable';
import type { RandomStatDTO } from './random-stat';
import { RandomStat } from './random-stat';
import type { StatType } from './stat-type';
import {
  isCritFlat,
  isCritPercent,
  isElementalAttackFlat,
  isElementalAttackPercent,
  isElementalDamagePercent,
} from './stat-type';

export class Gear implements Persistable<GearDTO> {
  private _id: string;
  private _type: GearType;
  private _stars: number;

  public randomStats: (RandomStat | undefined)[];
  public augmentStats: AugmentStat[];
  public isAugmented: boolean;
  public isTitan: boolean;

  public constructor(type: GearType) {
    this._id = nanoid();
    this._type = type;
    this._stars = 0;
    this.randomStats = [];
    this.resetRandomStats();
    this.augmentStats = [];
    this.isAugmented = false;
    this.isTitan = false;
  }

  public get id() {
    return this._id;
  }

  public get type() {
    return this._type;
  }
  public set type(type: GearType) {
    this._type = type;
    this.resetRandomStats();
  }

  public get stars() {
    return this._stars;
  }
  public set stars(stars: number) {
    if (stars >= 0 && stars <= maxNumOfRandomStatRolls) {
      this._stars = stars;
    }
  }
  public getPossibleStars(): number[] {
    return Object.keys(
      groupBy(this.getRandomStatRollCombinations(), 'stars')
    ).map((x) => +x);
  }

  public getTotalAttackFlat(elementalType: CoreElementalType): number {
    return this.additiveSumElementalStatValues(
      elementalType,
      isElementalAttackFlat
    );
  }

  public getTotalAttackPercent(elementalType: CoreElementalType): number {
    return this.additiveSumElementalStatValues(
      elementalType,
      isElementalAttackPercent
    );
  }

  public getTotalCritFlat(): number {
    return this.additiveSumStatValues(isCritFlat);
  }

  public getTotalCritPercent(): number {
    return this.additiveSumStatValues(isCritPercent);
  }

  public getTotalDamagePercent(elementalType: CoreElementalType): number {
    return this.additiveSumElementalStatValues(
      elementalType,
      isElementalDamagePercent
    );
  }

  public getRandomStatRollCombinations() {
    const allRandomStatsWithRollCombinations = this.randomStats.map(
      (randomStat) =>
        randomStat
          ? randomStat.getRollCombinations().map(
              (rollCombination): RandomStatRollCombination => ({
                randomStatId: randomStat.type.id,
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
      this.stars ||
      allRandomStatsWithRollCombinations
        .map((x) => x[0]?.rollCombination?.numberOfRolls ?? 0)
        .reduce((prev, current) => prev + current, 0);

    const maxNumOfRollsToCheck = this.stars || maxNumOfRandomStatRolls;

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

  public getMaxTitanGear(elementalType?: CoreElementalType): Gear | undefined {
    if (
      this.stars !== 5 &&
      !(
        this.getPossibleStars().length === 1 && this.getPossibleStars()[0] === 5
      )
    ) {
      return undefined;
    }

    const maxTitanGear = new Gear(this.type);
    Gear.copy(this, maxTitanGear);

    const gearStatRollCombinations =
      maxTitanGear.getRandomStatRollCombinations();
    if (!gearStatRollCombinations.length) {
      return undefined;
    }

    const rollBreakdown =
      gearStatRollCombinations[0].randomStatRollCombinations;
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

    maxTitanGear.isAugmented = true;
    maxTitanGear.isTitan = true;

    return maxTitanGear;

    function fillAugmentStatsIfPossible(statNameCollection: StatName[]) {
      statNameCollection.forEach((statName) => {
        if (
          maxTitanGear.augmentStats.length < maxNumOfAugmentStats &&
          !maxTitanGear.randomStats.some(
            (randomStat) => randomStat?.type.id === statName
          ) &&
          !maxTitanGear.augmentStats.some(
            (augmentStat) => augmentStat.type.id === statName
          )
        ) {
          const statType = statTypesLookup.byId[statName];
          maxTitanGear.augmentStats.push(new AugmentStat(statType));
        }
      });
    }

    function setMaxAugmentIncrease(stats: (RandomStat | undefined)[]) {
      stats.forEach((stat) => {
        if (stat) {
          stat.augmentIncreaseValue = stat.getMaxAugmentIncrease();
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
          statType: randomStat.type,
        }));

      const randomStatsAndTypesByRole = groupBy(
        randomStatsAndTypes,
        'statType.role'
      );

      // Seems only ele atk values get 'pulled up'
      let highestValueWithAugment: number | undefined = undefined;
      Object.keys(randomStatsAndTypesByRole).forEach((role) => {
        if (role === 'Attack') {
          randomStatsAndTypesByRole[role]
            .filter(
              (randomStatAndType) =>
                // Filter out 'Attack'
                randomStatAndType.statType.elementalType !== 'All'
            )
            .sort(
              (a, b) => (b.randomStat?.value ?? 0) - (a.randomStat?.value ?? 0)
            )
            .forEach((randomStatAndType, i) => {
              if (randomStatAndType.randomStat) {
                if (i === 0) {
                  highestValueWithAugment =
                    randomStatAndType.randomStat.getTotalValueWithAugment();

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
                  const pullUptoValue = BigNumber(
                    highestValueWithAugment
                  ).times(pullUpFactor);

                  const { randomStat } = randomStatAndType;
                  randomStat.augmentIncreaseValue = pullUptoValue
                    .minus(randomStat.value)
                    .toNumber();
                }
              }
            });
        }
      });

      maxTitanGear.augmentStats.forEach((augmentStat) => {
        const statType = augmentStat.type;
        if (
          highestValueWithAugment &&
          statType.role === 'Attack' &&
          // Filter out 'Attack'
          statType.elementalType !== 'All'
        ) {
          const pullUptoValue = BigNumber(highestValueWithAugment).times(
            augmentStatsPullUpFactor1
          );
          augmentStat.augmentIncreaseValue = pullUptoValue
            .minus(augmentStat.value)
            .toNumber();
        }
      });
    }
  }

  // Additively sum up all random stat & augment stat values based on a stat type condition
  private additiveSumStatValues(
    predicate: (statType: StatType) => boolean
  ): number {
    return additiveSum(
      this.randomStats.concat(this.augmentStats).map((stat) => {
        if (!stat) return 0;

        const statType = stat.type;
        return predicate(statType) ? stat.getTotalValueWithAugment() : 0;
      })
    ).toNumber();
  }

  // Additively sum up all random stat & augment values based on a stat type & elemental type condition
  private additiveSumElementalStatValues(
    elementalType: CoreElementalType,
    predicate: (statType: StatType, elementalType: CoreElementalType) => boolean
  ): number {
    return additiveSum(
      this.randomStats.concat(this.augmentStats).map((stat) => {
        if (!stat) return 0;

        const statType = stat.type;
        return predicate(statType, elementalType)
          ? stat.getTotalValueWithAugment()
          : 0;
      })
    ).toNumber();
  }

  private resetRandomStats() {
    this.randomStats = [...Array(this._type.numberOfRandomStats)].map(
      () => undefined
    );
  }

  // Copy all gear properties over except for the id
  static copy(from: Gear, to: Gear) {
    to.type = from.type;
    to.stars = from.stars;

    to.randomStats = [];
    from.randomStats.forEach((fromRandomStat, index) => {
      if (fromRandomStat) {
        if (to.randomStats[index]) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          RandomStat.copy(fromRandomStat, to.randomStats[index]!);
        } else {
          const newStat = new RandomStat(fromRandomStat.type);
          RandomStat.copy(fromRandomStat, newStat);
          to.randomStats[index] = newStat;
        }
      } else {
        to.randomStats[index] = undefined;
      }
    });

    to.augmentStats = [];
    from.augmentStats.forEach((fromAugmentStat, index) => {
      if (to.augmentStats[index]) {
        AugmentStat.copy(fromAugmentStat, to.augmentStats[index]);
      } else {
        const newStat = new AugmentStat(fromAugmentStat.type);
        AugmentStat.copy(fromAugmentStat, newStat);
        to.augmentStats[index] = newStat;
      }
    });

    to.isAugmented = from.isAugmented;
    to.isTitan = from.isTitan;
  }

  public copyFromDTO(dto: GearDTO): void {
    const {
      id,
      typeId,
      stars,
      randomStats: randomStatDTOs,
      augmentStats: augmentStatDTOs,
      isAugmented,
      isTitan,
    } = dto;

    const gearType = gearTypesLookup.byId[typeId];
    this._id = id;
    this.type = gearType;
    this.stars = stars;
    this.isAugmented = !!isAugmented;
    this.isTitan = !!isTitan;

    this.resetRandomStats();
    randomStatDTOs.forEach((randomStatDTO, i) => {
      if (randomStatDTO) {
        const statType = statTypesLookup.byId[randomStatDTO.typeId];
        const randomStat = new RandomStat(statType);
        randomStat.copyFromDTO(randomStatDTO);
        this.randomStats[i] = randomStat;
      }
    });

    this.augmentStats = [];
    augmentStatDTOs?.forEach((augmentStatDTO, i) => {
      const statType = statTypesLookup.byId[augmentStatDTO.typeId];
      const augmentStat = new AugmentStat(statType);
      augmentStat.copyFromDTO(augmentStatDTO);
      this.augmentStats[i] = augmentStat;
    });
  }

  public toDTO(): GearDTO {
    const { id, type, stars, randomStats, augmentStats, isAugmented, isTitan } =
      this;
    return {
      id,
      typeId: type.id,
      stars,
      randomStats: randomStats.map((randomStat) => randomStat?.toDTO()),
      augmentStats: augmentStats.map((augmentStat) => augmentStat.toDTO()),
      isAugmented,
      isTitan,
    };
  }
}
// staticImplements<PersistableConstructor<GearDTO>>(Gear);

export interface GearDTO {
  id: string;
  typeId: GearName;
  stars: number;
  randomStats: (RandomStatDTO | undefined)[];
  augmentStats?: AugmentStatDTO[];
  isAugmented?: boolean;
  isTitan?: boolean;
}
