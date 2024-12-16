import { Card, CardActionArea, CardContent, CardHeader } from "@mui/material";

import type { GearSetPreset } from "../../../../models/gear/gear-set-preset";
import { GearSummaryCardList } from "../GearSummaryCardList/GearSummaryCardList";

export interface GearSetPresetSummaryCardProps {
  preset: GearSetPreset;
  onClick?(): void;
}

export function GearSetPresetSummaryCard({
  preset,
  onClick,
}: GearSetPresetSummaryCardProps) {
  const gears = preset.gearSet.getGears();

  return (
    <Card sx={{ width: "fit-content" }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <CardHeader title={preset.name} />
        <CardContent>
          <GearSummaryCardList gears={gears} elevation={1} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
