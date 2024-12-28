import { Stack } from "@mui/material";

import type { Gear } from "../../../models/gear/gear";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import { GearSummaryCard } from "../GearSummaryCard/GearSummaryCard";

export interface GearSummaryCardListProps extends PropsWithElevation {
  gears: Gear[];
}

export function GearSummaryCardList({
  gears,
  elevation,
}: GearSummaryCardListProps) {
  return (
    <Stack sx={{ gap: 0.5 }}>
      {gears.map((gear) => (
        <GearSummaryCard key={gear.id} gear={gear} elevation={elevation} />
      ))}
    </Stack>
  );
}
