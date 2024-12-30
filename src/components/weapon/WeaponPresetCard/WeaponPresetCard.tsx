import { Card, CardActionArea, Stack } from "@mui/material";

import type { MatrixSlot } from "../../../models/matrix/matrix-slot";
import type { Weapon } from "../../../models/weapon/weapon";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { WeaponCardContent } from "../WeaponCard/WeaponCardContent";

export interface WeaponPresetCardProps extends PropsWithElevation, PropsWithSx {
  weapon: Weapon;
  matrixSlots: MatrixSlot[];
  onClick?(): void;
}

export function WeaponPresetCard({
  weapon,
  matrixSlots,
  onClick,
  elevation,
  sx,
}: WeaponPresetCardProps) {
  return (
    <Card elevation={elevation} sx={{ width: "fit-content", ...sx }}>
      <CardActionArea
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
            weapon={weapon}
            matrixSlots={matrixSlots}
            showWeaponDescription={false}
            elevation={elevation}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
}
