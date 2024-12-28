import { Card, CardActionArea, CardContent } from "@mui/material";

import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { HasSxProps } from "../../__helpers__/has-sx-props";
import type { WeaponDefinitionCardContentProps } from "./WeaponDefinitionCardContent";
import { WeaponDefinitionCardContent } from "./WeaponDefinitionCardContent";

export interface WeaponDefinitionCardProps
  extends WeaponDefinitionCardContentProps,
    HasSxProps {
  onClick?(id: WeaponName): void;
}

export function WeaponDefinitionCard({
  id,
  weaponDisplayName,
  simulacrumDisplayName,
  iconWeaponName,
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
            iconWeaponName={iconWeaponName}
            elementalIcon={elementalIcon}
            type={type}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
