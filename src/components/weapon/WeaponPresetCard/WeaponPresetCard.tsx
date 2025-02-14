import { Card, CardActionArea, Stack } from "@mui/material";

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
    <Card elevation={elevation} sx={{ ...sx }}>
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
        <Stack direction="row" sx={{ gap: 2 }}>
          <WeaponCardContent
            definition={weaponDefinition}
            stars={stars}
            matrixSlots={matrixSlots}
            showWeaponDescription={true}
            elevation={elevation}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
}
