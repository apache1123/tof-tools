import type { SxProps } from "@mui/material";
import { Box, Card, CardActionArea, CardContent, Stack } from "@mui/material";

import type { Weapon } from "../../../../models/weapon/weapon";
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
          <Stack sx={{ gap: 2, alignItems: "flex-start", pb: 2 }}>
            <WeaponDefinitionCardContent
              id={id}
              weaponDisplayName={weaponDisplayName}
              simulacrumDisplayName={simulacrumDisplayName}
              iconWeaponName={iconWeaponName}
              elementalIcon={elementalIcon}
              type={type}
            />
            <Box sx={{ px: 2 }}>
              <WeaponStarsSelector stars={stars} readOnly />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
