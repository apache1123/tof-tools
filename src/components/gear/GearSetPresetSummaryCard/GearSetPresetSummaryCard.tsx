import { Card, CardActionArea, CardContent } from "@mui/material";

import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import { CardList } from "../../common/CardList/CardList";
import { SectionSubheading } from "../../common/SectionHeading/SectionSubheading";
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
        <CardContent>
          <SectionSubheading>{preset.name}</SectionSubheading>
          <CardList direction="row" gap={0.5}>
            {gears.map((gear) => (
              <GearSummaryCard key={gear.id} gear={gear} elevation={1} />
            ))}
          </CardList>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
