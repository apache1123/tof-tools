import { Card, CardActionArea, CardContent } from "@mui/material";

import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import type { WeaponDefinitionCardContentProps } from "./WeaponDefinitionCardContent";
import { WeaponDefinitionCardContent } from "./WeaponDefinitionCardContent";

export interface WeaponDefinitionCardProps
  extends WeaponDefinitionCardContentProps,
    PropsWithSx {
  onClick?(id: WeaponDefinitionId): void;
}

export function WeaponDefinitionCard({
  id,
  weaponDisplayName,
  simulacrumDisplayName,
  iconWeaponId,
  elementalIcon,
  type,
  sx,
  onClick,
}: WeaponDefinitionCardProps) {
  return (
    <Card sx={{ width: "fit-content", ...sx }}>
      <CardActionArea
        component={onClick ? "button" : "div"}
        disabled={!onClick}
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
            iconWeaponId={iconWeaponId}
            elementalIcon={elementalIcon}
            type={type}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
