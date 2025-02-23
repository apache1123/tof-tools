import { Divider, Typography } from "@mui/material";
import pluralize from "pluralize";
import { Fragment } from "react";

import { NumericString } from "../../components/common/NumericString/NumericString";
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
                <b>{`${y.randomStatId}: `}</b>
                {pluralize("roll", y.rollCombination.numberOfRolls, true)}
                {!!y.rollCombination.numberOfRolls && (
                  <Typography gutterBottom>
                    Average strength of each roll:{" "}
                    <NumericString
                      value={y.rollCombination.rollStrength}
                      variant="percentage"
                    />
                    . Total weighting:{" "}
                    <NumericString
                      value={y.rollCombination.totalRollWeight}
                      variant="percentage"
                    />
                  </Typography>
                )}
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </>
  );
};
