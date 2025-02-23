import { Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import type { StatTypeElementalType } from "../../../definitions/elemental-type";
import type { StatRole } from "../../../definitions/stat-types";
import {
  toSignedIntegerString,
  toSignedPercentageString1dp,
} from "../../../utils/number-utils";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { ElementalStyledText } from "../../elemental/ElementalStyledText/ElementalStyledText";
import { StatTypeIcon } from "../StatTypeIcon/StatTypeIcon";

export interface StatDisplayProps extends PropsWithSx {
  role: StatRole;
  element: StatTypeElementalType;
  displayName: string;
  value: number;
  isPercentageBased: boolean;
  iconSize?: number;
}

export function StatDisplay({
  role,
  element,
  displayName,
  value,
  isPercentageBased,
  iconSize,
  sx,
}: StatDisplayProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        typography: "body2",
        ...sx,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <StatTypeIcon role={role} element={element} size={iconSize} />
        <ColorText>{displayName}</ColorText>
      </Stack>
      <ColorText>
        {isPercentageBased
          ? toSignedPercentageString1dp(value)
          : toSignedIntegerString(value)}
      </ColorText>
    </Stack>
  );

  function ColorText({ children }: PropsWithChildren) {
    const roles: StatRole[] = ["Attack", "Attack %", "Damage %"];

    return roles.includes(role) &&
      (element === "Altered" ||
        element === "Flame" ||
        element === "Frost" ||
        element === "Physical" ||
        element === "Volt") ? (
      <ElementalStyledText elementalType={element}>
        {children}
      </ElementalStyledText>
    ) : (
      <Typography variant="inherit">{children}</Typography>
    );
  }
}
