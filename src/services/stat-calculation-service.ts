import BigNumber from 'bignumber.js';

import {
  RollCombination,
  zeroRollCombination,
} from '../models/random-stat-roll-combination';
import { Stat } from '../models/stat';

const maxNumOfRolls = 5;

export const statCalculationService = {
  getRandomStatRollCombinations(randomStat: Stat): RollCombination[] {
    const { value } = randomStat;
    if (!value) return [];
    if (!randomStat.type) return [];

    if (value === randomStat.type.randomStatDefaultValue) {
      return [zeroRollCombination()];
    }

    const {
      randomStatDefaultValue,
      randomStatMinRollValue,
      randomStatMaxRollValue,
    } = randomStat.type;

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
      maxNumOfRolls
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
  },
};
