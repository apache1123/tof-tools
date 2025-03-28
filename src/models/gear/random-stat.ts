import BigNumber from "bignumber.js";

import { maxNumOfRandomStatRolls } from "../../definitions/gear";
import type { RollCombination } from "./random-stat-roll-combination";
import { zeroRollCombination } from "./random-stat-roll-combination";
import { type StatType } from "./stat-type";

export class RandomStat {
  public constructor(type: StatType) {
    this._type = type;
    this._value = 0;
    this.resetValueToDefault();
    this._augmentIncreaseValue = 0;
  }

  private _value: number;
  private _augmentIncreaseValue: number;
  private _type: StatType;

  public get type(): StatType {
    return this._type;
  }

  public set type(type: StatType) {
    this._type = type;
    this.resetValueToDefault();
  }

  public get value(): number {
    return this._value;
  }

  public get augmentIncreaseValue(): number {
    return this._augmentIncreaseValue;
  }

  /** Total effective stat value.
   * If before augmenting, this is the same as `value`.
   * If after augmenting, this is (5-star base) `value` + `augmentIncreaseValue`.
   */
  public get totalValue(): number {
    return BigNumber(this._value).plus(this._augmentIncreaseValue).toNumber();
  }

  public static copy(from: RandomStat, to: RandomStat) {
    to.type = from.type;
    to._value = from._value;
    to._augmentIncreaseValue = from._augmentIncreaseValue;
  }

  /** Sets the value and adjusts the total value (keeping the augmentIncreaseValue the same). This should be the default behaviour in most use cases.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 2 + 5 = 7
   * => 3 + 5 = 8
   * => 6 + 5 = 11
   * */
  public setValueAndAdjustTotalValue(number: number): void {
    this._value = number;
  }

  /** Sets the value whilst keeping the total value the same (adjusts the augmentIncreaseValue). If the total value cannot be kept the same (if the value being set is greater than the total value), it will fall back to the default behaviour of adjusting the total value.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 2 + 5 = 7
   * => 3 + 4 = 7
   * => 6 + 1 = 7
   * => 10 + 1 = 11 // fallback
   * */
  public setValueAndKeepTotalValue(number: number): void {
    if (number <= this.totalValue) {
      const total = this.totalValue;
      this._value = number;
      this._augmentIncreaseValue = BigNumber(total)
        .minus(this._value)
        .toNumber();
    } else {
      this.setValueAndAdjustTotalValue(number);
    }
  }

  /** Sets the augment increase value and adjusts the total value (keeping the value the same). This should be the default behaviour in most use cases.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 2 + 5 = 7
   * => 2 + 6 = 8
   * => 2 + 10 = 12
   * */
  public setAugmentIncreaseValueAndAdjustTotalValue(number: number): void {
    this._augmentIncreaseValue = number;
  }

  /** Sets the augment increase value whilst keeping the total value the same (adjusts the value). If the total value cannot be kept the same (if the augment increase value being set is greater than the total value), it will fall back to the default behaviour of adjusting the total value.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 5 + 2 = 7
   * => 4 + 3 = 7
   * => 1 + 6 = 7
   * => 1 + 10 = 11 // fallback
   * */
  public setAugmentIncreaseValueAndKeepTotalValue(number: number): void {
    if (number <= this.totalValue) {
      const total = this.totalValue;
      this._augmentIncreaseValue = number;
      this._value = BigNumber(total)
        .minus(this._augmentIncreaseValue)
        .toNumber();
    } else {
      this.setAugmentIncreaseValueAndAdjustTotalValue(number);
    }
  }

  /** Sets the total value and adjusts the augment increase value (keeping the value the same). This should be the default behaviour in most use cases. If the total value is less than the value, this will do nothing.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 2 + 5 = 7
   * => 2 + 6 = 8
   * => 2 + 10 = 12
   * => 2 + 10 = 1 // This will do nothing. Total value is still 12
   * */
  public setTotalValueAndAdjustAugmentIncreaseValue(number: number): void {
    if (number >= this._value) {
      this._augmentIncreaseValue = BigNumber(number)
        .minus(this._value)
        .toNumber();
    }
  }

  /** Sets the total value and adjusts the value (keeping the augment increase value the same). If the total value is less than the augment value, this will do nothing.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 2 + 5 = 7
   * => 3 + 5 = 8
   * => 7 + 5 = 12
   * => 7 + 5 = 1 // This will do nothing. Total value is still 12
   * */
  public setTotalValueAndAdjustValue(number: number): void {
    if (number >= this._augmentIncreaseValue) {
      this._value = BigNumber(number)
        .minus(this.augmentIncreaseValue)
        .toNumber();
    }
  }

  public resetValueToDefault() {
    const { randomStatDefaultValue } = this.type;
    this._value = randomStatDefaultValue;
  }

  public getMaxAugmentIncrease(): number {
    const { maxAugmentIncreaseMultiplier, maxAugmentIncreaseFlat } = this.type;
    return BigNumber(this._value)
      .multipliedBy(maxAugmentIncreaseMultiplier)
      .plus(maxAugmentIncreaseFlat)
      .toNumber();
  }

  public getMaxAugmentTotalValue(): number {
    return BigNumber(this._value).plus(this.getMaxAugmentIncrease()).toNumber();
  }

  public addOneAverageRoll() {
    const {
      _value,
      type: { randomStatMinRollValue, randomStatMaxRollValue },
    } = this;
    const averageRollValue = BigNumber(randomStatMinRollValue)
      .plus(randomStatMaxRollValue)
      .dividedBy(2);
    this._value = averageRollValue.plus(_value).toNumber();
  }

  public addOneMaxRoll() {
    const {
      _value,
      type: { randomStatMaxRollValue },
    } = this;
    this._value = BigNumber(_value).plus(randomStatMaxRollValue).toNumber();
  }

  public getRollCombinations(): RollCombination[] {
    const {
      _value,
      type: {
        randomStatDefaultValue,
        randomStatMinRollValue,
        randomStatMaxRollValue,
      },
    } = this;
    if (!_value) return [];

    if (_value <= randomStatDefaultValue) {
      return [zeroRollCombination()];
    }

    // ceil((value - defaultValue) / maxValue)
    const smallestNumOfRolls = BigNumber(_value)
      .minus(BigNumber(randomStatDefaultValue))
      .dividedBy(BigNumber(randomStatMaxRollValue))
      .integerValue(BigNumber.ROUND_CEIL)
      .toNumber();
    // min(((value - defaultValue) / minValue), maxNumOfRolls)
    const largestNumOfRolls = BigNumber.min(
      BigNumber(_value)
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
          : BigNumber(_value)
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
          : BigNumber(_value)
              .minus(randomStatDefaultValue)
              .div(n)
              .div(randomStatMaxRollValue)
              .times(n)
              .toNumber();

      combinations.push({ numberOfRolls: n, rollStrength, totalRollWeight });
    }

    return combinations;
  }
}
