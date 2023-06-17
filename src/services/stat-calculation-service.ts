import BigNumber from 'bignumber.js';

import { RandomStat } from '../models/random-stat';
import {
  RollCombination,
  zeroRollCombination,
} from '../models/random-stat-roll-combination';

const maxNumOfRolls = 5;

export const statCalculationService = {
  getRandomStatRollCombinations(randomStat: RandomStat): RollCombination[] {
    const { value } = randomStat;
    if (!value) return [];

    if (value === randomStat.type.defaultValue) {
      return [zeroRollCombination()];
    }

    const {
      defaultValue,
      rollRange: { minValue, maxValue },
    } = randomStat.type;

    // ceil((value - defaultValue) / maxValue)
    const smallestNumOfRolls = BigNumber(value)
      .minus(BigNumber(defaultValue))
      .dividedBy(BigNumber(maxValue))
      .integerValue(BigNumber.ROUND_CEIL)
      .toNumber();
    // min(((value - defaultValue) / minValue), maxNumOfRolls)
    const largestNumOfRolls = BigNumber.min(
      BigNumber(value)
        .minus(BigNumber(defaultValue))
        .dividedBy(BigNumber(minValue))
        .integerValue(BigNumber.ROUND_FLOOR),
      maxNumOfRolls
    ).toNumber();

    const combinations: RollCombination[] = [];
    for (let n = smallestNumOfRolls; n <= largestNumOfRolls; n++) {
      // (value - defaultValue - n * minValue) / (maxValue - minValue) / n
      const rollStrength = BigNumber(value)
        .minus(BigNumber(defaultValue))
        .minus(BigNumber(minValue).multipliedBy(n))
        .dividedBy(BigNumber(maxValue).minus(BigNumber(minValue)))
        .dividedBy(n)
        .toNumber();
      combinations.push({ numberOfRolls: n, rollStrength });
    }

    return combinations;
  },
};
