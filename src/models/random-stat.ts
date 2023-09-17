import BigNumber from 'bignumber.js';

import { maxNumOfRandomStatRolls } from '../constants/gear';
import type { StatName } from '../constants/stat-types';
import { statTypesLookup } from '../constants/stat-types';
import { toIntegerString, toPercentageString2dp } from '../utils/number-utils';
import type { Persistable } from './persistable';
import type { RollCombination } from './random-stat-roll-combination';
import { zeroRollCombination } from './random-stat-roll-combination';
import { type StatType } from './stat-type';

export class RandomStat implements Persistable<RandomStatDTO> {
  private _type: StatType;

  public value: number;
  public augmentIncreaseValue: number;

  public constructor(type: StatType) {
    this._type = type;
    this.value = 0;
    this.resetValueToDefault();
    this.augmentIncreaseValue = 0;
  }

  public get type(): StatType {
    return this._type;
  }
  public set type(type: StatType) {
    this._type = type;
    this.resetValueToDefault();
  }

  public getValueToString(): string {
    const {
      value,
      type: { isPercentageBased },
    } = this;
    return isPercentageBased
      ? toPercentageString2dp(value)
      : toIntegerString(value);
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

  public getAugmentIncreaseValueToString(): string {
    const {
      augmentIncreaseValue,
      type: { isPercentageBased },
    } = this;
    return isPercentageBased
      ? toPercentageString2dp(augmentIncreaseValue)
      : toIntegerString(augmentIncreaseValue);
  }

  public getTotalValueWithAugment(): number {
    return BigNumber(this.value).plus(this.augmentIncreaseValue).toNumber();
  }
  public getTotalValueWithAugmentToString(): string {
    const { isPercentageBased } = this.type;
    const value = this.getTotalValueWithAugment();
    return isPercentageBased
      ? toPercentageString2dp(value)
      : toIntegerString(value);
  }

  public addOneAverageRoll() {
    const {
      value,
      type: { randomStatMinRollValue, randomStatMaxRollValue },
    } = this;
    const averageRollValue = BigNumber(randomStatMinRollValue)
      .plus(randomStatMaxRollValue)
      .dividedBy(2);
    const newValue = averageRollValue.plus(value).toNumber();
    this.value = newValue;
  }

  public addOneMaxRoll() {
    const {
      value,
      type: { randomStatMaxRollValue },
    } = this;
    const newValue = BigNumber(value).plus(randomStatMaxRollValue).toNumber();
    this.value = newValue;
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

    if (value === randomStatDefaultValue) {
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
      maxNumOfRandomStatRolls
    ).toNumber();

    const combinations: RollCombination[] = [];
    for (let n = smallestNumOfRolls; n <= largestNumOfRolls; n++) {
      // (value - defaultValue - n * minValue) / (maxValue - minValue) / n
      const rollStrength = BigNumber(value)
        .minus(BigNumber(randomStatDefaultValue))
        .minus(BigNumber(randomStatMinRollValue).multipliedBy(n))
        .dividedBy(
          BigNumber(randomStatMaxRollValue).minus(
            BigNumber(randomStatMinRollValue)
          )
        )
        .dividedBy(n)
        .toNumber();
      combinations.push({ numberOfRolls: n, rollStrength });
    }

    return combinations;
  }

  static copy(from: RandomStat, to: RandomStat) {
    to.type = from.type;
    to.value = from.value;
    to.augmentIncreaseValue = from.augmentIncreaseValue;
  }

  public copyFromDTO(dto: RandomStatDTO): void {
    const { typeId, value, augmentIncreaseValue } = dto;

    this.type = statTypesLookup.byId[typeId];
    this.value = value;
    this.augmentIncreaseValue = augmentIncreaseValue ?? 0;
  }

  public toDTO(): RandomStatDTO {
    const { type, value, augmentIncreaseValue } = this;
    return {
      typeId: type.id,
      value,
      augmentIncreaseValue,
    };
  }
}
// staticImplements<PersistableConstructor<RandomStatDTO>>(RandomStat);

export interface RandomStatDTO {
  typeId: StatName;
  value: number;
  augmentIncreaseValue?: number;
}
