import { Card, CardActionArea, Stack } from "@mui/material";

import type { MatrixSlot } from "../../../../models/matrix/matrix-slot";
import type { Weapon } from "../../../../models/weapon/weapon";
import type { HasSxProps } from "../../../helpers/has-sx-props";
import { WeaponCardContent } from "../WeaponCard/WeaponCardContent";

export interface WeaponPresetCardProps extends HasSxProps {
  weapon: Weapon;
  matrixSlots: MatrixSlot[];
  onClick?(): void;
}

export function WeaponPresetCard({
  weapon,
  matrixSlots,
  onClick,
  sx,
}: WeaponPresetCardProps) {
  return (
    <Card sx={{ width: "fit-content", ...sx }}>
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
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
}
