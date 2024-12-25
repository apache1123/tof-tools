import { Card, CardActionArea, CardContent, Stack } from "@mui/material";

import type { Weapon } from "../../../../models/weapon/weapon";
import type { HasSxProps } from "../../../helpers/has-sx-props";
import { MatrixSlotIconList } from "../../matrix/MatrixSlotIconList/MatrixSlotIconList";
import { WeaponDefinitionCardContent } from "../WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponCardProps extends HasSxProps {
  weapon: Weapon;
  onClick?(): void;
}

export function WeaponCard({ weapon, sx, onClick }: WeaponCardProps) {
  const {
    definitionId,
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
              id={definitionId}
              weaponDisplayName={weaponDisplayName}
              simulacrumDisplayName={simulacrumDisplayName}
              iconWeaponName={iconWeaponName}
              elementalIcon={elementalIcon}
              type={type}
            />

            <Stack sx={{ px: 2, gap: 1 }}>
              <WeaponStarsSelector stars={stars} readOnly />
              <MatrixSlotIconList matrixSlots={matrixSlots.getSlots()} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
