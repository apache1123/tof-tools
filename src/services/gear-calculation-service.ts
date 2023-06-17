import { Gear } from '../models/gear';
import {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from '../models/gear-random-stat-roll-combinations';
import { cartesian } from '../utils/array-utils';
import { statCalculationService } from './stat-calculation-service';

const maxNumOfRandomStatRolls = 5;

export const gearCalculationService = {
  getRandomStatRollCombinations(gear: Gear) {
    const allRandomStatsWithRollCombinations = gear.randomStats.map(
      (randomStat) =>
        statCalculationService.getRandomStatRollCombinations(randomStat).map(
          (rollCombination): RandomStatRollCombination => ({
            randomStatName: randomStat.type.name,
            rollCombination,
          })
        )
    );

    const allPossibleCombinations: RandomStatRollCombination[][] = cartesian(
      allRandomStatsWithRollCombinations
    );

    // Assuming the roll combinations for each stat is ordered by least number of rolls first
    const minNumOfRollsToCheck =
      gear.stars ??
      allRandomStatsWithRollCombinations
        .map((x) => x[0]?.rollCombination?.numberOfRolls ?? 0)
        .reduce((prev, current) => prev + current, 0);

    const maxNumOfRollsToCheck = gear.stars ?? maxNumOfRandomStatRolls;

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
  },
};
