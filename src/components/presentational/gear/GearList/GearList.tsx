import { Stack } from "@mui/material";

import type { Gear, GearId } from "../../../../models/gear/gear";
import { GearCard } from "../GearCard/GearCard";

export interface GearListProps {
  gears: Gear[];
  onClick?: (id: GearId) => void;
}

export function GearList({ gears, onClick }: GearListProps) {
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        flexWrap: "wrap",
      }}
    >
      {gears.map((gear) => (
        <GearCard
          key={gear.id}
          gear={gear}
          onClick={() => {
            if (onClick) onClick(gear.id);
          }}
        />
      ))}
    </Stack>
  );
}
