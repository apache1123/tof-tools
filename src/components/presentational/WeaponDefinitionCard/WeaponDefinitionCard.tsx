import type { SxProps } from "@mui/material";
import { Card, CardActionArea, CardContent } from "@mui/material";

import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponDefinitionCardContentProps } from "./WeaponDefinitionCardContent";
import { WeaponDefinitionCardContent } from "./WeaponDefinitionCardContent";

export interface WeaponDefinitionCardProps
  extends WeaponDefinitionCardContentProps {
  sx?: SxProps;
  onClick?(id: WeaponName): void;
}

export function WeaponDefinitionCard({
  id,
  weaponDisplayName,
  simulacrumDisplayName,
  elementalIcon,
  type,
  sx,
  onClick,
}: WeaponDefinitionCardProps) {
  return (
    <Card sx={{ width: "fit-content", ...sx }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick(id);
        }}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <WeaponDefinitionCardContent
            id={id}
            weaponDisplayName={weaponDisplayName}
            simulacrumDisplayName={simulacrumDisplayName}
            elementalIcon={elementalIcon}
            type={type}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
