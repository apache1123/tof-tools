import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Tooltip } from "@mui/material";
import groupBy from "lodash.groupby";

import { GearStarsSelector } from "../components/GearStarsSelector/GearStarsSelector";
import type { Gear } from "../models/gear/gear";

export interface GearStarsProps {
  gearSnap: Gear;
  gearState: Gear;
}

export function GearStars({ gearSnap, gearState }: GearStarsProps) {
  const randomStatRollCombinations = gearSnap.getRandomStatRollCombinations();

  const possibleStars = Object.keys(
    groupBy(randomStatRollCombinations, (x) => x.stars),
  );

  return (
    <Box>
      <GearStarsSelector
        stars={
          gearSnap.stars ||
          (randomStatRollCombinations.length === 1
            ? randomStatRollCombinations[0].stars
            : 0)
        }
        onStarsChange={(stars) => {
          gearState.stars = stars;
        }}
      />
      {gearSnap.stars === 0 && randomStatRollCombinations.length > 1 && (
        <Tooltip
          title={
            <>
              Can&apos;t automatically determine the number of stars{" "}
              <strong>(either {possibleStars.join(" or ")} stars)</strong>.
              Please select it manually.
            </>
          }
        >
          <InfoOutlinedIcon color="info" sx={{ ml: 1 }} />
        </Tooltip>
      )}
    </Box>
  );
}
