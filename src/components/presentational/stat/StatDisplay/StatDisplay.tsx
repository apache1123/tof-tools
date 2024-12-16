import { Stack, Typography } from "@mui/material";

import type { StatTypeElementalType } from "../../../../definitions/elemental-type";
import type { StatRole } from "../../../../definitions/stat-types";
import {
  toSignedPercentageString1dp,
  toSignedString,
} from "../../../../utils/number-utils";
import { StatTypeIcon } from "../StatTypeIcon/StatTypeIcon";

export interface StatDisplayProps {
  typeRole: StatRole;
  element: StatTypeElementalType;
  displayName: string;
  value: number;
  isPercentageBased: boolean;
  iconSize?: number;
}

export function StatDisplay({
  typeRole,
  element,
  displayName,
  value,
  isPercentageBased,
  iconSize,
}: StatDisplayProps) {
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
        <StatTypeIcon role={typeRole} element={element} size={iconSize} />
        <Typography variant="inherit">{displayName}</Typography>
      </Stack>
      <Typography variant="inherit">
        {isPercentageBased
          ? toSignedPercentageString1dp(value)
          : toSignedString(value)}
      </Typography>
    </Stack>
  );
}
