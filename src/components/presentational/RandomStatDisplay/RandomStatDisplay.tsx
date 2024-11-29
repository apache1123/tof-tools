import { Stack, Typography } from "@mui/material";

import type { RandomStat } from "../../../models/gear/random-stat";
import {
  toSignedPercentageString1dp,
  toSignedString,
} from "../../../utils/number-utils";
import { StatTypeIcon } from "../StatTypeIcon/StatTypeIcon";

export interface RandomStatDisplayProps {
  randomStat: RandomStat;
}

export function RandomStatDisplay({ randomStat }: RandomStatDisplayProps) {
  const { type, totalValue } = randomStat;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        typography: "body2",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <StatTypeIcon statType={type} />
        <Typography variant="inherit">{type.shortDisplayName}</Typography>
      </Stack>
      <Typography variant="inherit">
        {type.isPercentageBased
          ? toSignedPercentageString1dp(totalValue)
          : toSignedString(totalValue)}
      </Typography>
    </Stack>
  );
}
