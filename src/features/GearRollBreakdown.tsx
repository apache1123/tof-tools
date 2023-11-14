import { Divider, Typography } from '@mui/material';
import pluralize from 'pluralize';
import { Fragment } from 'react';

import { NumericStringPercentage } from '../components/NumericString/NumericString';
import { type Gear } from '../models/gear';

export interface GearRollBreakdownProps {
  gearSnap: Gear;
}

export const GearRollBreakdown = ({ gearSnap }: GearRollBreakdownProps) => {
  const randomStatRollCombinations = gearSnap.getRandomStatRollCombinations();

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
                  {!!y.rollCombination.rollStrength && (
                    <>
                      , strength:{' '}
                      <NumericStringPercentage
                        value={y.rollCombination.rollStrength}
                      />
                    </>
                  )}
                </Typography>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </>
  );
};
