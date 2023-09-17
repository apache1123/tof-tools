import { Divider, Typography } from '@mui/material';
import pluralize from 'pluralize';
import { Fragment } from 'react';
import { useSnapshot } from 'valtio';

import { type Gear } from '../models/gear';
import { toPercentageString } from '../utils/number-utils';

export interface GearRollBreakdownProps {
  gear: Gear;
}

export const GearRollBreakdown = ({ gear }: GearRollBreakdownProps) => {
  const gearSnap = useSnapshot(gear);
  const randomStatRollCombinations = (
    gearSnap as Gear
  ).getRandomStatRollCombinations();

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
