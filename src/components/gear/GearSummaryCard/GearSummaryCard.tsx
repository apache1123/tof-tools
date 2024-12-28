import { Box, Card, Stack } from "@mui/material";

import type { Gear } from "../../../models/gear/gear";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import { StatDisplay } from "../../stat/StatDisplay/StatDisplay";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

export interface GearSummaryCardProps extends PropsWithElevation {
  gear: Gear;
}

export function GearSummaryCard({ gear, elevation }: GearSummaryCardProps) {
  const summaryStats = gear.getSummaryStats();

  const width = 320;
  const height = 60;

  return (
    <Card
      elevation={elevation}
      sx={{
        width,
        height,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box sx={{ mr: 1 }}>
        <GearTypeIcon id={gear.type.id} size={height} />
      </Box>
      <Stack
        sx={{
          height: "100%",
          py: 0.5,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {summaryStats.map((stat, i) => (
          <StatDisplay
            key={i}
            typeRole={stat.role}
            element={stat.element}
            displayName={stat.displayName}
            value={stat.value}
            isPercentageBased={stat.isPercentageBased}
            iconSize={20}
          />
        ))}
      </Stack>
    </Card>
  );
}
