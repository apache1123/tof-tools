import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Stack, Tooltip } from "@mui/material";
import groupBy from "lodash.groupby";

import type { Gear } from "../../../models/gear/gear";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { GearStarsSelector } from "../GearStarsSelector/GearStarsSelector";

export interface GearStarsProps extends PropsWithSx {
  gear: Gear;
  readOnly?: boolean;
  onStarsChange?: (stars: number) => void;
}

export function GearStars({
  gear,
  readOnly,
  onStarsChange,
  sx,
}: GearStarsProps) {
  const { stars } = gear;

  const randomStatRollCombinations = gear.getRandomStatRollCombinations();

  const possibleStars = Object.keys(
    groupBy(randomStatRollCombinations, (x) => x.stars),
  );

  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 0.5,
        alignItems: "center",
        ...sx,
      }}
    >
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
          <InfoOutlinedIcon color="info" />
        </Tooltip>
      )}
    </Stack>
  );
}
