import type { CardProps } from "@mui/material";
import { Stack } from "@mui/material";

import type { Gear } from "../../../../models/gear/gear";
import { GearSummaryCard } from "../GearSummaryCard/GearSummaryCard";

export interface GearSummaryCardListProps {
  gears: Gear[];
  elevation?: CardProps["elevation"];
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
