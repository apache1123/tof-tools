import { Stack } from "@mui/material";

import type { Gear } from "../../models/gear/gear";
import { GearCard } from "../GearCard/GearCard";

export interface GearListProps {
  gears: Gear[];
  onClick?: (gear: Gear) => void;
}

export function GearList({ gears }: GearListProps) {
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        flexWrap: "wrap",
      }}
    >
      {gears.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </Stack>
  );
}
