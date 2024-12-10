import type { SxProps } from "@mui/material";
import { Card, CardActionArea, CardContent, Stack } from "@mui/material";

import type { Weapon } from "../../../../models/weapon/weapon";
import { MatrixSlotIcon } from "../../matrix-slot/MatrixSlotIcon/MatrixSlotIcon";
import { WeaponDefinitionCardContent } from "../WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponCardProps {
  weapon: Weapon;
  sx?: SxProps;
  onClick?(): void;
}

export function WeaponCard({ weapon, sx, onClick }: WeaponCardProps) {
  const {
    id,
    weaponDisplayName,
    simulacrumDisplayName,
    iconWeaponName,
    elementalIcon,
    type,
    stars,
    matrixSlots,
  } = weapon;

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
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack sx={{ gap: 1, alignItems: "flex-start", pb: 2 }}>
            <WeaponDefinitionCardContent
              id={id}
              weaponDisplayName={weaponDisplayName}
              simulacrumDisplayName={simulacrumDisplayName}
              iconWeaponName={iconWeaponName}
              elementalIcon={elementalIcon}
              type={type}
            />

            <Stack sx={{ px: 2, gap: 1 }}>
              <WeaponStarsSelector stars={stars} readOnly />
              <Stack direction="row" sx={{ gap: 0.5 }}>
                {matrixSlots.getSlots().map((slot) => (
                  <MatrixSlotIcon
                    key={slot.acceptsType.id}
                    type={slot.acceptsType}
                    matrix={slot.matrix}
                    elevation={1}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
