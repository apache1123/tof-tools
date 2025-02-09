import { Divider, Typography } from "@mui/material";
import pluralize from "pluralize";
import { Fragment } from "react";

import { NumericStringPercentage } from "../../components/common/NumericString/NumericString";
import { type Gear } from "../../models/gear/gear";

export interface GearRollBreakdownProps {
  gear: Gear;
}

export const GearRollBreakdown = ({ gear }: GearRollBreakdownProps) => {
  const randomStatRollCombinations = gear.getRandomStatRollCombinations();

  const hasOnlyOneRollCombination = randomStatRollCombinations.length === 1;

  return (
    <>
      {randomStatRollCombinations.map((x, i) => (
        <Fragment key={i}>
          {!!i && <Divider>or</Divider>}
          {!gear.stars && !hasOnlyOneRollCombination && (
            <Typography variant="h6">{x.stars} star gear:</Typography>
          )}
          <ul>
            {x.randomStatRollCombinations.map((y) => (
              <li key={y.randomStatId}>
                <Typography>
                  <b>{`${y.randomStatId}: `}</b>
                  {pluralize("roll", y.rollCombination.numberOfRolls, true)}
                  {!!y.rollCombination.numberOfRolls && (
                    <div>
                      Average strength of each roll:{" "}
                      <NumericStringPercentage
                        value={y.rollCombination.rollStrength}
                      />
                      . Total weighting:{" "}
                      <NumericStringPercentage
                        value={y.rollCombination.totalRollWeight}
                      />
                    </div>
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
