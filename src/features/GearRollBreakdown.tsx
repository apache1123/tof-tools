import { Divider, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import pluralize from 'pluralize';
import { Fragment } from 'react';
import { useSnapshot } from 'valtio';

import { maxNumOfRandomStatRolls } from '../constants/gear';
import type { Gear } from '../models/gear';
import type {
  GearRandomStatRollCombinations,
  RandomStatRollCombination,
} from '../models/gear-random-stat-roll-combinations';
import type { RandomStat } from '../models/random-stat';
import { getType } from '../models/random-stat';
import type { RollCombination } from '../models/random-stat-roll-combination';
import { zeroRollCombination } from '../models/random-stat-roll-combination';
import { cartesian } from '../utils/array-utils';
import { toPercentageString } from '../utils/number-utils';

export interface GearRollBreakdownProps {
  gear: Gear;
}

export const GearRollBreakdown = ({ gear }: GearRollBreakdownProps) => {
  const gearSnap = useSnapshot(gear);
  const randomStatRollCombinations = getGearRandomStatRollCombinations(
    gearSnap as Gear
  );

  const hasOnlyOneRollCombination = randomStatRollCombinations.length === 1;

  return (
    <>
      {randomStatRollCombinations.map((x, i) => (
        <Fragment key={i}>
          {!!i && <Divider>or</Divider>}
          {!gearSnap.stars && !hasOnlyOneRollCombination && (
            <Typography variant="h6">{x.stars} star gear:</Typography>
          )}
          <ul>
            {x.randomStatRollCombinations.map((y) => (
              <li key={y.randomStatId}>
                <Typography>
                  <b>{`${y.randomStatId}: `}</b>
                  {pluralize('roll', y.rollCombination.numberOfRolls, true)}
                  {!!y.rollCombination.rollStrength &&
                    `, strength: ${toPercentageString(
                      y.rollCombination.rollStrength
                    )}`}
                </Typography>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </>
  );
};

function getGearRandomStatRollCombinations(gear: Gear) {
  const allRandomStatsWithRollCombinations = gear.randomStats.map(
    (randomStat) =>
      randomStat
        ? getRandomStatRollCombinations(randomStat).map(
            (rollCombination): RandomStatRollCombination => ({
              randomStatId: randomStat.typeId,
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
    gear.stars ||
    allRandomStatsWithRollCombinations
      .map((x) => x[0]?.rollCombination?.numberOfRolls ?? 0)
      .reduce((prev, current) => prev + current, 0);

  const maxNumOfRollsToCheck = gear.stars || maxNumOfRandomStatRolls;

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

function getRandomStatRollCombinations(
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
