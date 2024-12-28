import { Card, CardActionArea, CardContent, CardHeader } from "@mui/material";

import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import { CardList } from "../../common/CardList/CardList";
import { GearSummaryCard } from "../GearSummaryCard/GearSummaryCard";

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
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <CardHeader title={preset.name} />
        <CardContent>
          <CardList direction="column" gap={0.5}>
            {gears.map((gear) => (
              <GearSummaryCard key={gear.id} gear={gear} elevation={1} />
            ))}
          </CardList>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
