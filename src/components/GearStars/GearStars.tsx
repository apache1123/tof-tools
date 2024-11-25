import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Tooltip } from "@mui/material";
import groupBy from "lodash.groupby";
import { useSnapshot } from "valtio";

import type { Gear } from "../../models/gear/gear";
import { GearStarsSelector } from "../GearStarsSelector/GearStarsSelector";

export interface GearStarsProps {
  gear: Gear;
  readOnly?: boolean;
}

export function GearStars({ gear, readOnly }: GearStarsProps) {
  const gearSnap = useSnapshot(gear);
  const { stars } = gearSnap;

  const randomStatRollCombinations = gearSnap.getRandomStatRollCombinations();

  const possibleStars = Object.keys(
    groupBy(randomStatRollCombinations, (x) => x.stars),
  );

  return (
    <Box>
      <GearStarsSelector
        stars={
          stars ||
          (randomStatRollCombinations.length === 1
            ? randomStatRollCombinations[0].stars
            : 0)
        }
        onStarsChange={(stars) => {
          gear.stars = stars;
        }}
        readOnly={readOnly}
        size="small"
      />
      {stars === 0 && randomStatRollCombinations.length > 1 && (
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
