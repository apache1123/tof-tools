import { Card, CardActionArea, Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import type { Gear } from "../../models/gear/gear";
import { GearStars } from "../GearStars/GearStars";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

export interface GearCardProps {
  gear: Gear;
  onClick?: (gear: Gear) => void;
}

export function GearCard({ gear, onClick }: GearCardProps) {
  const { type, isAugmented } = useSnapshot(gear);
  return (
    <Card sx={{ width: "fit-content" }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick(gear);
        }}
      >
        <Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mr: 1, alignItems: "center" }}
          >
            <GearTypeIcon gearName={type.id} isTitan={isAugmented} />
            <GearStars gear={gear} readOnly />
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
