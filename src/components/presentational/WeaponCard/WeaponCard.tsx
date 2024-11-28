import { Card, CardActionArea, CardContent, Stack } from "@mui/material";

import type { Weapon } from "../../../models/weapon/weapon";
import { WeaponDefinitionCardContent } from "../WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponCardProps {
  weapon: Weapon;
  onClick?(weapon: Weapon): void;
}

export function WeaponCard({ weapon, onClick }: WeaponCardProps) {
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
    <Card sx={{ width: "fit-content" }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick(weapon);
        }}
        sx={{ height: "100%", display: "flex", alignItems: "flex-start" }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack sx={{ gap: 2, alignItems: "center", pb: 2 }}>
            <WeaponDefinitionCardContent
              id={id}
              weaponDisplayName={weaponDisplayName}
              simulacrumDisplayName={simulacrumDisplayName}
              iconWeaponName={iconWeaponName}
              elementalIcon={elementalIcon}
              type={type}
            />
            <WeaponStarsSelector stars={stars} readOnly />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
