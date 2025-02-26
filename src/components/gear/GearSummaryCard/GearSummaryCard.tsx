import { Box, Card, Typography } from "@mui/material";
import type { ReactNode } from "react";

import type { GearTypeId } from "../../../definitions/gear-types";
import type { Gear } from "../../../models/gear/gear";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import { GearSummary } from "../GearSummary/GearSummary";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

const height = 60;
const iconWidth = 60;

export interface GearSummaryCardProps extends PropsWithElevation {
  gear: Gear;
}

export function GearSummaryCard({ gear, elevation }: GearSummaryCardProps) {
  const summary = gear.getSummary();

  return (
    <Layout
      icon={
        <GearTypeIcon id={gear.type.id} rarity={gear.rarity} size={height} />
      }
      stats={<GearSummary summary={summary} sx={{ gap: 1 }} />}
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
        <GearTypeIcon
          id={gearTypeId}
          monochromeWhite
          size={height * 0.7}
          sx={{ mt: 1 }}
        />
      }
      stats={
        <Box sx={{ alignSelf: "center" }}>
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
        minHeight: height,
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          width: iconWidth,
          mr: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ height: "100%", py: 0.5 }}>{stats}</Box>
    </Card>
  );
}
