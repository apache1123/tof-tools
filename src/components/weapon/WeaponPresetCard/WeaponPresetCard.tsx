import { Box, Card, CardActionArea, Typography } from "@mui/material";
import type { ReactNode } from "react";

import type { WeaponDefinition } from "../../../definitions/types/weapon/weapon-definition";
import type { MatrixSlot } from "../../../models/matrix/matrix-slot";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { WeaponCardContent } from "../WeaponCard/WeaponCardContent";

export interface WeaponPresetCardProps extends PropsWithElevation, PropsWithSx {
  weaponDefinition: WeaponDefinition;
  stars: number;
  matrixSlots: MatrixSlot[];
  onClick?(): void;
}

export function WeaponPresetCard({
  weaponDefinition,
  stars,
  matrixSlots,
  onClick,
  elevation,
  sx,
}: WeaponPresetCardProps) {
  return (
    <Layout
      content={
        <WeaponCardContent
          definition={weaponDefinition}
          stars={stars}
          matrixSlots={matrixSlots}
          showWeaponDescription={true}
          elevation={elevation}
        />
      }
      onClick={onClick}
      elevation={elevation}
      sx={sx}
    />
  );
}

export interface EmptyWeaponPresetCardProps
  extends PropsWithElevation,
    PropsWithSx {
  onClick?(): void;
}

export function EmptyWeaponPresetCard({
  onClick,
  elevation,
  sx,
}: EmptyWeaponPresetCardProps) {
  return (
    <Layout
      content={
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "text.secondary" }}>No weapon</Typography>
        </Box>
      }
      onClick={onClick}
      elevation={elevation}
      sx={sx}
    />
  );
}

interface LayoutProps extends PropsWithElevation, PropsWithSx {
  content: ReactNode;
  onClick?(): void;
}

function Layout({ content, onClick, elevation, sx }: LayoutProps) {
  return (
    <Card elevation={elevation} sx={{ minWidth: 325, minHeight: 255, ...sx }}>
      <CardActionArea
        component={onClick ? "button" : "div"}
        disabled={!onClick}
        onClick={() => {
          if (onClick) onClick();
        }}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          p: 2,
        }}
      >
        {content}
      </CardActionArea>
    </Card>
  );
}
