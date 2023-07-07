import { Button, Modal, Paper, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import pluralize from 'pluralize';
import { Fragment, useState } from 'react';
import { useSnapshot } from 'valtio';

import { modalStyle } from '../components/Modal/Modal';
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

export interface GearRandomStatsRollsDetailsProps {
  gear: Gear;
}

export const GearRandomStatsRollsDetails = ({
  gear,
}: GearRandomStatsRollsDetailsProps) => {
  const gearSnap = useSnapshot(gear);
  const randomStatRollCombinations = getGearRandomStatRollCombinations(
    gearSnap as Gear
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Random stats rolls details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={modalStyle} elevation={0}>
          {randomStatRollCombinations.map((x) => (
            <Fragment key={x.stars}>
              <Typography variant="h6">For a {x.stars} star gear:</Typography>
              <ul>
                {x.randomStatRollCombinations.map((y) => (
                  <li key={y.randomStatId}>
                    <Typography>
                      <b>{`${y.randomStatId}: `}</b>
                      {pluralize('roll', y.rollCombination.numberOfRolls, true)}
                      {!!y.rollCombination.rollStrength &&
                        `, strength: ${y.rollCombination.rollStrength.toLocaleString(
                          'en',
                          { style: 'percent' }
                        )}`}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
        </Paper>
      </Modal>
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
