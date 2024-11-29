import BigNumber from "bignumber.js";

import { maxNumOfRandomStatRolls } from "../definitions/gear";
import type { StatName } from "../definitions/stat-types";
import { statTypesLookup } from "../definitions/stat-types";
import { toIntegerString, toPercentageString2dp } from "../utils/number-utils";
import type { Dto } from "./dto";
import type { Persistable } from "./persistable";
import type { RollCombination } from "./random-stat-roll-combination";
import { zeroRollCombination } from "./random-stat-roll-combination";
import { type StatType } from "./stat-type";

export class RandomStat implements Persistable<RandomStatDto> {
  public constructor(type: StatType) {
    this._type = type;
    this.value = 0;
    this.resetValueToDefault();
    this.augmentIncreaseValue = 0;
  }

  public value: number;
  public augmentIncreaseValue: number;
  private _type: StatType;

  public get type(): StatType {
    return this._type;
  }
  public set type(type: StatType) {
    this._type = type;
    this.resetValueToDefault();
  }

  public get valueString(): string {
    const {
      value,
      type: { isPercentageBased },
    } = this;
    return isPercentageBased
      ? toPercentageString2dp(value)
      : toIntegerString(value);
  }

  public get augmentIncreaseValueString(): string {
    const {
      augmentIncreaseValue,
      type: { isPercentageBased },
    } = this;
    return isPercentageBased
      ? toPercentageString2dp(augmentIncreaseValue)
      : toIntegerString(augmentIncreaseValue);
  }

  /** Total effective stat value.
   * If before augmenting, this is the same as `value`.
   * If after augmenting, this is (5-star base) `value` + `augmentIncreaseValue`.
   */
  public get totalValue(): number {
    return BigNumber(this.value).plus(this.augmentIncreaseValue).toNumber();
  }
  public set totalValue(value: number) {
    if (value >= this.value) {
      this.augmentIncreaseValue = BigNumber(value).minus(this.value).toNumber();
    }
  }
  public get totalValueString(): string {
    const { isPercentageBased } = this.type;
    const value = this.totalValue;
    return isPercentageBased
      ? toPercentageString2dp(value)
      : toIntegerString(value);
  }

  public static copy(from: RandomStat, to: RandomStat) {
    to.type = from.type;
    to.value = from.value;
    to.augmentIncreaseValue = from.augmentIncreaseValue;
  }

  public resetValueToDefault() {
    const { randomStatDefaultValue } = this.type;
    this.value = randomStatDefaultValue;
  }

  public getMaxAugmentIncrease(): number {
    const { maxAugmentIncreaseMultiplier, maxAugmentIncreaseFlat } = this.type;
    return BigNumber(this.value)
      .multipliedBy(maxAugmentIncreaseMultiplier)
      .plus(maxAugmentIncreaseFlat)
      .toNumber();
  }

  public addOneAverageRoll() {
    const {
      value,
      type: { randomStatMinRollValue, randomStatMaxRollValue },
    } = this;
    const averageRollValue = BigNumber(randomStatMinRollValue)
      .plus(randomStatMaxRollValue)
      .dividedBy(2);
    this.value = averageRollValue.plus(value).toNumber();
  }

  public addOneMaxRoll() {
    const {
      value,
      type: { randomStatMaxRollValue },
    } = this;
    this.value = BigNumber(value).plus(randomStatMaxRollValue).toNumber();
  }

  public getRollCombinations(): RollCombination[] {
    const {
      value,
      type: {
        randomStatDefaultValue,
        randomStatMinRollValue,
        randomStatMaxRollValue,
      },
    } = this;
    if (!value) return [];

    if (value <= randomStatDefaultValue) {
      return [zeroRollCombination()];
    }

    // ceil((value - defaultValue) / maxValue)
    const smallestNumOfRolls = BigNumber(value)
      .minus(BigNumber(randomStatDefaultValue))
      .dividedBy(BigNumber(randomStatMaxRollValue))
      .integerValue(BigNumber.ROUND_CEIL)
      .toNumber();
    // min(((value - defaultValue) / minValue), maxNumOfRolls)
    const largestNumOfRolls = BigNumber.min(
      BigNumber(value)
        .minus(BigNumber(randomStatDefaultValue))
        .dividedBy(BigNumber(randomStatMinRollValue))
        .integerValue(BigNumber.ROUND_FLOOR),
      maxNumOfRandomStatRolls,
    ).toNumber();

    const combinations: RollCombination[] = [];
    for (let n = smallestNumOfRolls; n <= largestNumOfRolls; n++) {
      // (value - defaultValue - n * minValue) / (maxValue - minValue) / n
      // Need to check if minValue === maxValue to prevent div by 0 in the case of % value stats, e.g. ele atk%, where every roll is fixed (minValue = maxValue). This also means % stats always have roll strength = 1
      const rollStrength =
        randomStatMinRollValue >= randomStatMaxRollValue
          ? 1
          : BigNumber(value)
              .minus(BigNumber(randomStatDefaultValue))
              .minus(BigNumber(randomStatMinRollValue).multipliedBy(n))
              .dividedBy(
                BigNumber(randomStatMaxRollValue).minus(
                  BigNumber(randomStatMinRollValue),
                ),
              )
              .dividedBy(n)
              .toNumber();

      // (value - defaultValue) / n / maxValue * n
      // a.k.a. work out the average of one roll, divided by the max roll value, multiplied by the number of rolls
      const totalRollWeight =
        n === 0
          ? 0
          : BigNumber(value)
              .minus(randomStatDefaultValue)
              .div(n)
              .div(randomStatMaxRollValue)
              .times(n)
              .toNumber();

      combinations.push({ numberOfRolls: n, rollStrength, totalRollWeight });
    }

    return combinations;
  }

  public copyFromDto(dto: RandomStatDto): void {
    const { typeId, value, augmentIncreaseValue } = dto;

    this.type = statTypesLookup.byId[typeId];
    this.value = value;
    this.augmentIncreaseValue = augmentIncreaseValue ?? 0;
  }

  public toDto(): RandomStatDto {
    const { type, value, augmentIncreaseValue } = this;
    return {
      typeId: type.id,
      value,
      augmentIncreaseValue,
      version: 1,
    };
  }
}

export interface RandomStatDto extends Dto {
  typeId: StatName;
  value: number;
  augmentIncreaseValue?: number;
  version: 1;
}
