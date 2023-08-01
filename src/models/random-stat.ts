import BigNumber from 'bignumber.js';

import { maxNumOfRandomStatRolls } from '../constants/gear';
import { statTypesLookup } from '../constants/stat-types';
import type { RollCombination } from './random-stat-roll-combination';
import { zeroRollCombination } from './random-stat-roll-combination';
import { type StatName, type StatType } from './stat-type';

export interface RandomStat {
  typeId: StatName;
  value: number;
}

export function newRandomStat(type: StatType): RandomStat {
  const randomStat = {} as RandomStat;
  setType(randomStat, type);
  return randomStat;
}

export function copyRandomStat(
  fromRandomStat: RandomStat,
  toRandomStat: RandomStat
) {
  setType(toRandomStat, getType(fromRandomStat));
  setValue(toRandomStat, fromRandomStat.value);
}

export function getType(randomStat: RandomStat) {
  return statTypesLookup.byId[randomStat.typeId];
}
export function setType(randomStat: RandomStat, type: StatType) {
  randomStat.typeId = type.id;
  resetValueToDefault(randomStat);
}

export function setValue(randomStat: RandomStat, value: number) {
  randomStat.value = value;
}

export function resetValueToDefault(randomStat: RandomStat) {
  const type = getType(randomStat);
  randomStat.value = type.randomStatDefaultValue;
}

export function getMaxAugmentIncrease(randomStat: RandomStat): number {
  const { maxAugmentIncreaseMultiplier, maxAugmentIncreaseFlat } =
    getType(randomStat);
  return BigNumber(randomStat.value)
    .multipliedBy(maxAugmentIncreaseMultiplier)
    .plus(maxAugmentIncreaseFlat)
    .toNumber();
}

export function addOneAverageRoll(randomStat: RandomStat) {
  const { randomStatMinRollValue, randomStatMaxRollValue } =
    getType(randomStat);
  const averageRollValue = BigNumber(randomStatMinRollValue)
    .plus(randomStatMaxRollValue)
    .dividedBy(2);
  const newValue = averageRollValue.plus(randomStat.value).toNumber();
  setValue(randomStat, newValue);
}

export function addOneMaxRoll(randomStat: RandomStat) {
  const { randomStatMaxRollValue } = getType(randomStat);
  const newValue = BigNumber(randomStat.value)
    .plus(randomStatMaxRollValue)
    .toNumber();
  setValue(randomStat, newValue);
}

export function getRandomStatRollCombinations(
  randomStat: RandomStat
): RollCombination[] {
  const { value } = randomStat;
  if (!value) return [];

  const statType = getType(randomStat);
  if (!statType) return [];

  const {
    randomStatDefaultValue,
    randomStatMinRollValue,
    randomStatMaxRollValue,
  } = statType;

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
