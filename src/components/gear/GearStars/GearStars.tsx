import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Tooltip } from "@mui/material";
import groupBy from "lodash.groupby";

import type { Gear } from "../../../models/gear/gear";
import { GearStarsSelector } from "../GearStarsSelector/GearStarsSelector";

export interface GearStarsProps {
  gear: Gear;
  readOnly?: boolean;
  onStarsChange?: (stars: number) => void;
}

export function GearStars({ gear, readOnly, onStarsChange }: GearStarsProps) {
  const { stars } = gear;

  const randomStatRollCombinations = gear.getRandomStatRollCombinations();

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
        onStarsChange={onStarsChange}
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
