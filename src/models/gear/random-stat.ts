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

  /** This is the base (SSR) value of the stat. */
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

  /** The minimum value for the `value` (base value) */
  public get minValue(): number {
    return this._type.randomStatDefaultValue;
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
  public setValue(number: number): void {
    if (number >= this.minValue) {
      this._value = number;
    }
  }

  /** Sets the value whilst making the best effort to keep the total value the same (adjusts the augmentIncreaseValue). If the total value cannot be kept the same (if the value being set is greater than the total value), it will fall back to the default behaviour of adjusting the total value.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 2 + 5 = 7
   * => 3 + 4 = 7
   * => 6 + 1 = 7
   * => 10 + 1 = 11 // fallback
   * */
  public setValueTryKeepTotalValue(number: number): void {
    if (number < this.minValue) return;

    if (number <= this.totalValue) {
      const total = this.totalValue;
      this._value = number;
      this._augmentIncreaseValue = BigNumber(total)
        .minus(this._value)
        .toNumber();
    } else {
      this.setValue(number);
    }
  }

  /** Sets the augment increase value and adjusts the total value (keeping the value the same). This should be the default behaviour in most use cases. Will do nothing if trying to set below 0.
   * @example
   * => [value] + [augmentIncreaseValue] = [totalValue]
   * => 2 + 5 = 7
   * => 2 + 6 = 8
   * => 2 + 10 = 12
   * */
  public setAugmentIncreaseValue(number: number): void {
    if (number >= 0) {
      this._augmentIncreaseValue = number;
    }
  }

  /** Sets the augment increase value whilst making the best effort to keep the total value the same (adjusts the value). If the total value cannot be kept the same (if the augment increase value being set is greater than the total value, or if the resulting (base) value will be less than the minimum allowed value), it will fall back to the default behaviour of adjusting the total value. Will do nothing if trying to set below 0.
   * @example
   * => [value](min:2) + [augmentIncreaseValue] = [totalValue]
   * => 5 + 2 = 7
   * => 4 + 3 = 7
   * => 4 + 12 = 16 // Total cannot be kept the same as the value being set is higher than total. Fallback to adjusting the total
   * => 4 + 15 = 19 // Total cannot be kept the same without the value dropping below the minimum allowed value. Fallback to adjusting the total
   * => 4 + -1 = 19 // Will do nothing
   * */
  public setAugmentIncreaseValueTryKeepTotalValue(number: number): void {
    if (number < 0) return;

    if (number <= this.totalValue) {
      const total = this.totalValue;
      const newBaseValue = BigNumber(total).minus(number).toNumber();

      if (newBaseValue < this.minValue) {
        this.setAugmentIncreaseValue(number);
      } else {
        this._augmentIncreaseValue = number;
        this._value = newBaseValue;
      }
    } else {
      this.setAugmentIncreaseValue(number);
    }
  }

  /** Sets the total value whilst making the best effort to keep the value the same (adjusts the augment increase value). This should be the default behaviour in most use cases. If the value cannot be kept the same (e.g. if in doing so will cause the resulting augment increase value to be less than 0), then the fallback behaviour is to set the augment increase value to 0 instead and adjust the value. Will do nothing if trying to set below the minimum value.
   * @example
   * => [value](min:2) + [augmentIncreaseValue] = [totalValue]
   * => 4 + 9 = 13
   * => 4 + 6 = 10
   * => 4 + 1 = 5
   * => 3 + 0 = 3 // Value cannot be kept at 4 as augmentIncrease will then be -1. Fallback behaviour, adjust value instead, set augmentIncreaseValue to 0
   * => 3 + 0 = 1 // Will do nothing. Below minimum value
   * */
  public setTotalValueTryKeepValue(number: number): void {
    if (number < this.minValue) return;

    const newAugmentIncreaseValue = BigNumber(number)
      .minus(this._value)
      .toNumber();
    if (newAugmentIncreaseValue >= 0) {
      this._augmentIncreaseValue = newAugmentIncreaseValue;
    } else {
      this._augmentIncreaseValue = 0;
      this._value = number;
    }
  }

  /** Sets the total value whilst making the best effort to keep the augment increase value the same (adjusts the value). If the augment increase value cannot be kept the same (e.g. if in doing so the value will fall below the minimum value), fallback to trying to keep the value the same instead. Will do nothing if trying to set below the minimum value.
   * @example
   * => [value](min:2) + [augmentIncreaseValue] = [totalValue]
   * => 4 + 9 = 13
   * => 5 + 9 = 14
   * => 5 + 5 = 10 // augmentValue cannot be kept at 9 as value will fall below min. Fallback to try to keep the value the same instead
   * => 4 + 0 = 4 // augmentValue cannot be kept at 5 as value will fall below min. Fallback to try to keep the value the same instead. In this case, that cannot be done also, which then has a fallback behaviour of adjusting the value if it also cannot be kept.
   * => 2 + 1 = 1 // Will do nothing
   * */
  public setTotalValueTryKeepAugmentIncreaseValue(number: number): void {
    if (number < this.minValue) return;

    const newValue = BigNumber(number)
      .minus(this.augmentIncreaseValue)
      .toNumber();
    if (newValue >= this.minValue) {
      this._value = newValue;
    } else {
      this.setTotalValueTryKeepValue(number);
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
