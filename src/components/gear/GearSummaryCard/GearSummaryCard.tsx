import { Box, Card, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import type { GearTypeId } from "../../../definitions/gear-types";
import type { Gear } from "../../../models/gear/gear";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import { StatDisplay } from "../../stat/StatDisplay/StatDisplay";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

const width = 320;
const height = 60;
const iconWidth = 60;

export interface GearSummaryCardProps extends PropsWithElevation {
  gear: Gear;
}

export function GearSummaryCard({ gear, elevation }: GearSummaryCardProps) {
  const summaryStats = gear.getSummaryStats();

  return (
    <Layout
      icon={
        <GearTypeIcon id={gear.type.id} rarity={gear.rarity} size={height} />
      }
      stats={
        <Stack
          sx={{
            gap: 1,
            flexWrap: "wrap",
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
      }
      elevation={elevation}
    />
  );
}

export interface EmptyGearSummaryCardProps extends PropsWithElevation {
  gearTypeId: GearTypeId;
}

export function EmptyGearSummaryCard({
  gearTypeId,
  elevation,
}: EmptyGearSummaryCardProps) {
  return (
    <Layout
      icon={
        <GearTypeIcon id={gearTypeId} monochromeWhite size={height * 0.7} />
      }
      stats={
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{
              justifySelf: "center",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            No gear
          </Typography>
        </Box>
      }
      elevation={elevation}
    />
  );
}

interface LayoutProps extends PropsWithElevation {
  icon: ReactNode;
  stats: ReactNode;
}

function Layout({ icon, stats, elevation }: LayoutProps) {
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
      <Box
        sx={{
          width: iconWidth,
          height,
          mr: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ height: "100%", py: 0.5 }}>{stats}</Box>
    </Card>
  );
}
