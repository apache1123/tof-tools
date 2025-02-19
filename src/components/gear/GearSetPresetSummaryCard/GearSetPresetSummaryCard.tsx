import { Card, CardActionArea, CardContent } from "@mui/material";

import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import { CardList } from "../../common/CardList/CardList";
import { SectionSubheading } from "../../common/SectionHeading/SectionSubheading";
import {
  EmptyGearSummaryCard,
  GearSummaryCard,
} from "../GearSummaryCard/GearSummaryCard";

export interface GearSetPresetSummaryCardProps extends PropsWithElevation {
  preset: GearSetPreset;
  onClick?(): void;
}

export function GearSetPresetSummaryCard({
  preset,
  onClick,
  elevation = 0,
}: GearSetPresetSummaryCardProps) {
  const gearSlots = preset.gearSet.getSlots();

  return (
    <Card elevation={elevation} sx={{ width: "fit-content" }}>
      <CardActionArea
        component={onClick ? "button" : "div"}
        disabled={!onClick}
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
            {gearSlots.map((gearSlot) =>
              gearSlot.gear ? (
                <GearSummaryCard
                  key={gearSlot.gear.id}
                  gear={gearSlot.gear}
                  elevation={elevation + 1}
                />
              ) : (
                <EmptyGearSummaryCard
                  key={gearSlot.acceptsType.id}
                  gearTypeId={gearSlot.acceptsType.id}
                  elevation={elevation + 1}
                />
              ),
            )}
          </CardList>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
