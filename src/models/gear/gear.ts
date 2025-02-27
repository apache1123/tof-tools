import BigNumber from "bignumber.js";
import groupBy from "lodash.groupby";
import { nanoid } from "nanoid";

import { prioritizedAugmentationStatTypesLookup } from "../../definitions/augmentation-stats";
import type {
  CoreElementalType,
  WeaponElementalType,
} from "../../definitions/elemental-type";
import {
  augmentStatsPullUpFactor1,
  augmentStatsPullUpFactor2,
  augmentStatsPullUpFactor3,
  maxNumOfAugmentStats,
  maxNumOfRandomStatRolls,
  maxNumOfRandomStats,
} from "../../definitions/gear";
import type { StatTypeId } from "../../definitions/stat-types";
import { statTypesLookup } from "../../definitions/stat-types";
import { filterOutUndefined } from "../../utils/array-utils";
import { cartesian } from "../../utils/cartesian-utils";
import { sum } from "../../utils/math-utils";
import { keysOf } from "../../utils/object-utils";
import type { CharacterId } from "../character/character-data";
import type { Id } from "../identifiable";
import { AugmentStat } from "./augment-stat";
import type {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from "./gear-random-stat-roll-combinations";
import type { GearRarity } from "./gear-rarity";
import type { GearStatDifference } from "./gear-stat-difference";
import type { GearSummary, GearSummaryStatsForElement } from "./gear-summary";
import type { GearType } from "./gear-type";
import type {
  PossibleAugmentStat,
  PossibleAugmentStats,
} from "./possible-augment-stats";
import { RandomStat } from "./random-stat";
import type { StatType } from "./stat-type";
import {
  isCritFlat,
  isCritPercent,
  isElementalAttackFlat,
  isElementalAttackPercent,
  isElementalDamagePercent,
  isHpFlat,
  isHpPercent,
  isResistanceFlat,
  isResistancePercent,
} from "./stat-type";

export type GearId = Id;

type RandomStatSlot = RandomStat | undefined;
type AugmentStatSlot = AugmentStat | undefined;

export class Gear {
  /**
   * @param type The type of the gear
   * @param characterId The character the gear belongs to
   * @param id Overriding id
   * */
  public constructor(type: GearType, characterId: CharacterId, id?: GearId) {
    this._id = id ?? nanoid();
    this._type = type;
    this.characterId = characterId;
    this._rarity = "SSR";
    this._stars = 0;
    this._randomStats = [];
    this._augmentStats = [];
  }

  public readonly characterId: CharacterId;
  private readonly _id: GearId;
  private readonly _type: GearType;
  private _rarity: GearRarity;
  private _stars: number;
  private _randomStats: RandomStatSlot[];
  private _augmentStats: AugmentStatSlot[];

  public get id(): GearId {
    return this._id;
  }

  public get type() {
    return this._type;
  }

  public get stars() {
    return this._stars;
  }
  public set stars(stars: number) {
    if (stars >= 0 && stars <= maxNumOfRandomStatRolls) {
      this._stars = stars;
    }
  }

  public get randomStats(): ReadonlyArray<RandomStatSlot> {
    return this._randomStats;
  }

  public get rarity() {
    return this._rarity;
  }
  public set rarity(value: GearRarity) {
    if (this._rarity === value) return;

    this._rarity = value;

    // Reset random stats augment to zero and clear all augment stats when going from an augmented/titan gear to an SSR gear
    if (value === "SSR") {
      this.resetRandomStatsAugment();
      this.clearAugmentStats();
    }

    // Augmented gear and titan gear are always 5 stars
    if (value === "Augmented" || value === "Titan") {
      this.stars = 5;
    }
  }

  /** Augmented gear and titan gear are both considered augmented */
  public get isAugmented(): boolean {
    return this.rarity === "Augmented" || this.rarity === "Titan";
  }

  public get augmentStats(): ReadonlyArray<AugmentStatSlot> {
    return this._augmentStats;
  }
  public get numOfAvailableAugmentStatSlots(): number {
    return Math.max(
      maxNumOfAugmentStats -
        this.augmentStats.filter((x) => x !== undefined).length,
      0,
    );
  }

  /** If this gear has any augment stats, or contains any random stats with an augment increase value */
  public get hasAnyAugmentValues(): boolean {
    return (
      this.augmentStats.length > 0 ||
      this.randomStats.some(
        (randomStat) => randomStat && randomStat.augmentIncreaseValue > 0,
      )
    );
  }

  /** Calculates the stat value differences between the two gears, using the `baseGear` as the basis */
  public static calculateStatDifference(
    baseGear: Gear,
    newGear: Gear,
  ): GearStatDifference {
    return {
      elementalAttackFlats: {
        Altered: getAttackFlatDifference("Altered"),
        Flame: getAttackFlatDifference("Flame"),
        Frost: getAttackFlatDifference("Frost"),
        Physical: getAttackFlatDifference("Physical"),
        Volt: getAttackFlatDifference("Volt"),
      },
      elementalAttackPercents: {
        Flame: getAttackPercentDifference("Flame"),
        Frost: getAttackPercentDifference("Frost"),
        Physical: getAttackPercentDifference("Physical"),
        Volt: getAttackPercentDifference("Volt"),
      },
      elementalDamagePercents: {
        Flame: getDamagePercentDifference("Flame"),
        Frost: getDamagePercentDifference("Frost"),
        Physical: getDamagePercentDifference("Physical"),
        Volt: getDamagePercentDifference("Volt"),
      },
      critRateFlat: BigNumber(newGear.getTotalCritFlat())
        .minus(baseGear.getTotalCritFlat())
        .toNumber(),
      critRatePercent: BigNumber(newGear.getTotalCritPercent())
        .minus(baseGear.getTotalCritPercent())
        .toNumber(),
      hpFlat: BigNumber(newGear.getTotalHpFlat())
        .minus(baseGear.getTotalHpFlat())
        .toNumber(),
      hpPercent: BigNumber(newGear.getTotalHpPercent())
        .minus(baseGear.getTotalHpPercent())
        .toNumber(),
      elementalResistanceFlats: {
        Altered: getResistanceFlatDifference("Altered"),
        Flame: getResistanceFlatDifference("Flame"),
        Frost: getResistanceFlatDifference("Frost"),
        Physical: getResistanceFlatDifference("Physical"),
        Volt: getResistanceFlatDifference("Volt"),
      },
      elementalResistancePercents: {
        Altered: getResistancePercentDifference("Altered"),
        Flame: getResistancePercentDifference("Flame"),
        Frost: getResistancePercentDifference("Frost"),
        Physical: getResistancePercentDifference("Physical"),
        Volt: getResistancePercentDifference("Volt"),
      },
    };

    function getAttackFlatDifference(element: WeaponElementalType): number {
      return BigNumber(newGear.getTotalAttackFlat(element))
        .minus(baseGear.getTotalAttackFlat(element))
        .toNumber();
    }

    function getAttackPercentDifference(element: CoreElementalType): number {
      return BigNumber(newGear.getTotalAttackPercent(element))
        .minus(baseGear.getTotalAttackPercent(element))
        .toNumber();
    }

    function getDamagePercentDifference(element: CoreElementalType): number {
      return BigNumber(newGear.getTotalElementalDamagePercent(element))
        .minus(baseGear.getTotalElementalDamagePercent(element))
        .toNumber();
    }

    function getResistanceFlatDifference(element: WeaponElementalType): number {
      return BigNumber(newGear.getTotalResistanceFlat(element))
        .minus(baseGear.getTotalResistanceFlat(element))
        .toNumber();
    }

    function getResistancePercentDifference(
      element: WeaponElementalType,
    ): number {
      return BigNumber(newGear.getTotalResistancePercent(element))
        .minus(baseGear.getTotalResistancePercent(element))
        .toNumber();
    }
  }

  /**  Copy all gear properties over except for the id, as long as the gear's type is the same.
   * This does not change the character the gear belongs to */
  public static copy(from: Gear, to: Gear) {
    if (from.type.id !== to.type.id) return;

    to.stars = from.stars;

    to._randomStats = [];
    from.randomStats.forEach((fromRandomStat, index) => {
      if (fromRandomStat) {
        const newStat = new RandomStat(fromRandomStat.type);
        RandomStat.copy(fromRandomStat, newStat);
        to.setRandomStat(index, newStat);
      }
    });

    to._augmentStats = [];
    from.augmentStats.forEach((fromAugmentStat, index) => {
      if (fromAugmentStat) {
        const newStat = new AugmentStat(fromAugmentStat.type);
        AugmentStat.copy(fromAugmentStat, newStat);
        to.setAugmentStat(index, newStat);
      }
    });

    to.rarity = from.rarity;
  }

  public getRandomStat(index: number): RandomStatSlot {
    return this._randomStats[index];
  }

  public setRandomStat(index: number, randomStat: RandomStatSlot) {
    if (index < 0 || index >= maxNumOfRandomStats)
      throw new Error("Invalid random stat index");

    this._randomStats[index] = randomStat;
  }

  public hasRandomStat(statTypeId: StatTypeId): boolean {
    return this.randomStats.some((stat) => stat?.type.id === statTypeId);
  }

  public getPossibleRandomStats(): StatType[] {
    return this.type.possibleRandomStatTypeIds
      .filter((statTypeId) => !this.hasStat(statTypeId))
      .map((statTypeId) => statTypesLookup.byId[statTypeId]);
  }

  public getAugmentStat(index: number): AugmentStatSlot {
    return this.augmentStats[index];
  }
  public setAugmentStat(index: number, augmentStat: AugmentStatSlot) {
    if (index < 0 || index >= maxNumOfAugmentStats)
      throw new Error("Invalid augment stat index");

    this._augmentStats[index] = augmentStat;
  }

  public hasAugmentStat(statTypeId: StatTypeId): boolean {
    return this.augmentStats.some((stat) => stat?.type.id === statTypeId);
  }

  public getAvailableAugmentStatIndex(): number | undefined {
    if (this.numOfAvailableAugmentStatSlots <= 0) return undefined;

    return this.augmentStats.findIndex((statSlot) => statSlot === undefined) !==
      -1
      ? this.augmentStats.findIndex((statSlot) => statSlot === undefined)
      : this.augmentStats.length < maxNumOfAugmentStats
        ? this.augmentStats.length
        : undefined;
  }

  /** Returns the highest rolled stat (highest weighted), or undefined if none or cannot be determined */
  public getHighestRolledRandomStat(): RandomStat | undefined {
    const gearStatRollCombinations = this.getRandomStatRollCombinations();
    if (!gearStatRollCombinations.length) {
      return undefined;
    }

    const rollBreakdown =
      gearStatRollCombinations[0].randomStatRollCombinations;
    const highestStatTypeId = rollBreakdown.reduce((prev, current) =>
      current.rollCombination.totalRollWeight >=
      prev.rollCombination.totalRollWeight
        ? current
        : prev,
    ).randomStatId;

    // Assuming random stats won't have repeated stat types
    return this.randomStats.find((stat) => stat?.type.id === highestStatTypeId);
  }

  /** Returns the random stats that have been rolled into i.e. not at initial value. */
  public getRolledRandomStats(): RandomStat[] {
    const gearStatRollCombinations = this.getRandomStatRollCombinations();
    if (!gearStatRollCombinations.length) {
      return [];
    }

    const rollBreakdown =
      gearStatRollCombinations[0].randomStatRollCombinations;

    return rollBreakdown
      .filter((x) => x.rollCombination.totalRollWeight !== 0)
      .flatMap((x) => {
        const randomStat = this.randomStats.find(
          (stat) => stat?.type.id === x.randomStatId,
        );
        return randomStat ? [randomStat] : [];
      });
  }

  public getAllStats(): ReadonlyArray<RandomStatSlot | AugmentStatSlot> {
    return this._randomStats.concat(this._augmentStats);
  }

  /** Checks if the gear has a stat with the given stat name (in random stats or augment stats) */
  public hasStat(statTypeId: StatTypeId): boolean {
    return this.getAllStats().some((stat) => stat?.type.id === statTypeId);
  }

  public getPossibleStars(): number[] {
    return Object.keys(
      groupBy(this.getRandomStatRollCombinations(), (x) => x.stars),
    ).map((x) => +x);
  }

  /** Returns total attack flat value for an element which will include ele atk flat + atk flat. Except for altered attack, which will not include atk flat */
  public getTotalAttackFlat(elementalType: WeaponElementalType): number {
    return this.additiveSumElementalStatValues(
      elementalType,
      isElementalAttackFlat,
    );
  }

  public getTotalAttackPercent(elementalType: WeaponElementalType): number {
    return this.additiveSumElementalStatValues(
      elementalType,
      isElementalAttackPercent,
    );
  }

  public getTotalCritFlat(): number {
    return this.additiveSumStatValues(isCritFlat);
  }

  public getTotalCritPercent(): number {
    return this.additiveSumStatValues(isCritPercent);
  }

  public getTotalElementalDamagePercent(
    elementalType: WeaponElementalType,
  ): number {
    return this.additiveSumElementalStatValues(
      elementalType,
      isElementalDamagePercent,
    );
  }

  public getTotalHpFlat(): number {
    return this.additiveSumStatValues(isHpFlat);
  }

  public getTotalHpPercent(): number {
    return this.additiveSumStatValues(isHpPercent);
  }

  /** Returns total resistance flat value for an element which will include ele resistance flat + resistance flat */
  public getTotalResistanceFlat(elementalType: WeaponElementalType): number {
    return this.additiveSumElementalStatValues(elementalType, isResistanceFlat);
  }

  public getTotalResistancePercent(elementalType: WeaponElementalType): number {
    return this.additiveSumElementalStatValues(
      elementalType,
      isResistancePercent,
    );
  }

  public getSummary(): GearSummary {
    const getElementSummaryStats = (
      element: WeaponElementalType,
    ): GearSummaryStatsForElement => {
      return {
        attackFlat: {
          role: "Attack",
          element,
          displayName: "ATK",
          value: this.getTotalAttackFlat(element),
          isPercentageBased: false,
        },
        attackPercent: {
          role: "Attack %",
          element,
          displayName: "ATK",
          value: this.getTotalAttackPercent(element),
          isPercentageBased: true,
        },
        damagePercent: {
          role: "Damage %",
          element,
          displayName: "DMG",
          value: this.getTotalElementalDamagePercent(element),
          isPercentageBased: true,
        },
      };
    };

    return {
      element: {
        Altered: getElementSummaryStats("Altered"),
        Flame: getElementSummaryStats("Flame"),
        Frost: getElementSummaryStats("Frost"),
        Physical: getElementSummaryStats("Physical"),
        Volt: getElementSummaryStats("Volt"),
      },
      critFlat: {
        role: "Crit",
        element: "All",
        displayName: "Crit",
        value: this.getTotalCritFlat(),
        isPercentageBased: false,
      },
      critPercent: {
        role: "Crit %",
        element: "All",
        displayName: "Crit",
        value: this.getTotalCritPercent(),
        isPercentageBased: true,
      },
    };
  }

  public getRandomStatRollCombinations(): GearRandomStatRollCombinations[] {
    const allRandomStatsWithRollCombinations = filterOutUndefined(
      this.randomStats,
    ).map((randomStat) =>
      randomStat.getRollCombinations().map(
        (rollCombination): RandomStatRollCombination => ({
          randomStatId: randomStat.type.id,
          rollCombination,
        }),
      ),
    );

    if (allRandomStatsWithRollCombinations.length === 0) return [];

    const allPossibleCombinations: RandomStatRollCombination[][] = cartesian(
      allRandomStatsWithRollCombinations,
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
              .reduce((prev, current) => prev + current, 0) === rolls,
        )
        .forEach((x) =>
          result.push({
            stars: rolls,
            randomStatRollCombinations: x,
          }),
        );
    }

    return result;
  }

  /** Returns a copy of the piece of gear that is augmented and has the random stats increased to their theoretical max (augment increase max), as well as filled augment stats, prioritizing the specified elementalType */
  public getMaxTitanGear(
    prioritizedElement?: CoreElementalType,
  ): Gear | undefined {
    if (
      this.stars !== 5 &&
      !(
        this.getPossibleStars().length === 1 && this.getPossibleStars()[0] === 5
      )
    ) {
      return undefined;
    }

    const maxTitanGear = new Gear(this.type, this.characterId);
    Gear.copy(this, maxTitanGear);

    fillAugmentStats();
    setMaxAugmentIncrease(maxTitanGear._randomStats);
    setMaxAugmentIncrease(maxTitanGear._augmentStats);
    pullUpStatsValueIfApplicable();

    maxTitanGear.rarity = "Titan";

    return maxTitanGear;

    function fillAugmentStats() {
      while (maxTitanGear.numOfAvailableAugmentStatSlots > 0) {
        const availableAugmentStatIndex =
          maxTitanGear.getAvailableAugmentStatIndex();

        if (availableAugmentStatIndex === undefined) {
          break;
        }

        const possibleAugmentStats = maxTitanGear.getPossibleAugmentStats();

        if (
          !possibleAugmentStats ||
          (possibleAugmentStats.priority.length === 0 &&
            possibleAugmentStats.fallback.length === 0)
        ) {
          break;
        }

        const elementalPrioritizedPossibleStats = prioritizedElement
          ? possibleAugmentStats.priority.filter(
              (priorityStat) =>
                priorityStat.type.elementalType === prioritizedElement,
            )
          : [];

        const fillAugmentStat = (statType: StatType) => {
          maxTitanGear.setAugmentStat(
            availableAugmentStatIndex,
            new AugmentStat(statType),
          );
        };

        if (elementalPrioritizedPossibleStats.length) {
          fillAugmentStat(elementalPrioritizedPossibleStats[0].type);
          continue;
        }

        if (possibleAugmentStats.priority.length) {
          fillAugmentStat(possibleAugmentStats.priority[0].type);
          continue;
        }

        if (possibleAugmentStats.fallback.length) {
          fillAugmentStat(possibleAugmentStats.fallback[0].type);
        }
      }
    }

    function setMaxAugmentIncrease(
      stats: RandomStatSlot[] | AugmentStatSlot[],
    ) {
      stats.forEach((stat) => {
        if (stat) {
          stat.augmentIncreaseValue = stat.getMaxAugmentIncrease();
        }
      });
    }

    function pullUpStatsValueIfApplicable() {
      const randomStatsAndTypes = filterOutUndefined(
        maxTitanGear.randomStats,
      ).map((randomStat) => ({
        randomStat,
        statType: randomStat.type,
      }));

      const randomStatsAndTypesByRole = groupBy(
        randomStatsAndTypes,
        (x) => x.statType.role,
      );

      // Seems only ele atk & ele atk % values get 'pulled up'
      // For random stats when augmenting, when there are multiple stats of the same stat type but of different elemental types, the stat with the highest value is used as a base, and the rest are "pulled-up" to be a factor of that value. The second highest value is pulled up to be 95% of the highest value, the third highest value is pulled up to be 90%, and the fourth highest value is pulled up to be 85% (unconfirmed, this is too rare).
      // TODO: the logic here kind of breaks down for atk% and dmg%. Because each roll is a fixed increase value, there may be two stats that are both the second highest value, but the below is not checking for equal values and just assumes every value when sorted descending will be lower than the previous.

      keysOf(randomStatsAndTypesByRole).forEach((role) => {
        if (role === "Attack" || role === "Attack %" || role === "Damage %") {
          let highestValueWithAugment: number | undefined = undefined;

          const randomStatsAndTypes = randomStatsAndTypesByRole[role];
          if (!randomStatsAndTypes) {
            return;
          }

          randomStatsAndTypes
            .filter(
              (randomStatAndType) =>
                // Filter out 'Attack'
                randomStatAndType.statType.elementalType !== "All",
            )
            .sort(
              (a, b) => (b.randomStat?.value ?? 0) - (a.randomStat?.value ?? 0),
            )
            .forEach((randomStatAndType, i) => {
              if (randomStatAndType.randomStat) {
                if (i === 0) {
                  highestValueWithAugment =
                    randomStatAndType.randomStat.totalValue;

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
                    highestValueWithAugment,
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

      // Similar "pull-up" happens with augment stats, but each augment stat will always be 95%.
      const valueWithAugmentOfHighestStat =
        maxTitanGear.getHighestRolledRandomStat()?.totalValue;
      maxTitanGear.augmentStats.forEach((augmentStat) => {
        if (!augmentStat) return;

        const statType = augmentStat.type;
        if (
          valueWithAugmentOfHighestStat &&
          (statType.role === "Attack" ||
            statType.role === "Attack %" ||
            statType.role === "Damage %") &&
          // Filter out 'Attack'
          statType.elementalType !== "All"
        ) {
          const pullUptoValue = BigNumber(valueWithAugmentOfHighestStat).times(
            augmentStatsPullUpFactor1,
          );
          augmentStat.augmentIncreaseValue = pullUptoValue
            .minus(augmentStat.value)
            .toNumber();
        }
      });
    }
  }

  /** Returns the possible augment stats for this gear. If the possible augment stats cannot be determined, returns undefined.
   * @arg includeAll Whether or not to filter out possible augment stats based on what has already been set in augment stats (default), or return all. (Stats already used in random stats will still not return in either case) */
  public getPossibleAugmentStats(
    includeAll?: boolean,
  ): PossibleAugmentStats | undefined {
    // Augment stats only possible at 5 stars
    const gearStatRollCombinations =
      this.getRandomStatRollCombinations().filter((x) => x.stars === 5);
    if (!gearStatRollCombinations.length) {
      return undefined;
    }

    const rollBreakdown =
      gearStatRollCombinations[0].randomStatRollCombinations;

    const highestStatTypeId = rollBreakdown.reduce((prev, current) => {
      if (
        current.rollCombination.totalRollWeight >
        prev.rollCombination.totalRollWeight
      )
        return current;

      // If there is a tie-break, take the first stat
      if (
        current.rollCombination.totalRollWeight ===
        prev.rollCombination.totalRollWeight
      )
        return prev;

      return prev;
    }).randomStatId;

    // Filter out those already used in random stats
    const isNotInRandomStats = (statTypeId: StatTypeId) =>
      !this.hasRandomStat(statTypeId);
    const prioritizedStatTypeIds =
      prioritizedAugmentationStatTypesLookup[
        highestStatTypeId
      ].prioritizedStatTypes.filter(isNotInRandomStats);
    const fallbackStatTypeIds =
      prioritizedAugmentationStatTypesLookup[
        highestStatTypeId
      ].fallbackStatTypes.filter(isNotInRandomStats);

    const isNotInAugmentStats = (statTypeId: StatTypeId) =>
      !this.hasAugmentStat(statTypeId);
    const mapPossibleAugmentStat = (
      statTypeId: StatTypeId,
    ): PossibleAugmentStat => ({ type: statTypesLookup.byId[statTypeId] });

    // The returned possible priority stats, based on if we are returning all or only returning those unused in augment stats as well
    const priorityPossibleStats = includeAll
      ? prioritizedStatTypeIds.map(mapPossibleAugmentStat)
      : prioritizedStatTypeIds
          .filter(isNotInAugmentStats)
          .map(mapPossibleAugmentStat);

    // If the number of priority possible stats is possible to fill the number of available augment stat slots, there is no need to return fallback stats
    const fallbackPossibleStats =
      prioritizedStatTypeIds.length >= maxNumOfAugmentStats
        ? []
        : includeAll
          ? fallbackStatTypeIds.map(mapPossibleAugmentStat)
          : fallbackStatTypeIds
              .filter(isNotInAugmentStats)
              .map(mapPossibleAugmentStat);

    return {
      priority: priorityPossibleStats,
      fallback: fallbackPossibleStats,
    };
  }

  // Additively sum up all random stat & augment stat values based on a stat type condition
  private additiveSumStatValues(
    predicate: (statType: StatType) => boolean,
  ): number {
    return sum(
      ...this.randomStats.concat(this.augmentStats).map((stat) => {
        if (!stat) return 0;

        const statType = stat.type;
        return predicate(statType) ? stat.totalValue : 0;
      }),
    ).toNumber();
  }

  // Additively sum up all random stat & augment values based on a stat type & elemental type condition
  private additiveSumElementalStatValues(
    elementalType: WeaponElementalType,
    predicate: (
      statType: StatType,
      elementalType: WeaponElementalType,
    ) => boolean,
  ): number {
    return sum(
      ...this.randomStats.concat(this.augmentStats).map((stat) => {
        if (!stat) return 0;

        const statType = stat.type;
        return predicate(statType, elementalType) ? stat.totalValue : 0;
      }),
    ).toNumber();
  }

  private resetRandomStatsAugment() {
    for (const randomStat of this.randomStats) {
      if (randomStat) {
        randomStat.augmentIncreaseValue = 0;
      }
    }
  }

  private clearAugmentStats() {
    this._augmentStats.length = 0;
  }
}
