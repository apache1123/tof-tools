import { Stack, Typography } from "@mui/material";

import type { FusionWeaponElementalType } from "../../../definitions/elemental-type";
import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponType } from "../../../definitions/weapons/weapon-type";
import { ElementalTypeIcon } from "../../elemental/ElementalTypeIcon/ElementalTypeIcon";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";
import { WeaponTypeIcon } from "../WeaponTypeIcon/WeaponTypeIcon";

export interface WeaponDefinitionCardContentProps {
  id: WeaponDefinitionId;
  weaponDisplayName: string;
  simulacrumDisplayName: string;
  iconWeaponId?: WeaponDefinitionId;
  elementalIcon: FusionWeaponElementalType;
  type: WeaponType;
  iconSize?: number;
  showWeaponDescription?: boolean;
}

export function WeaponDefinitionCardContent({
  id,
  weaponDisplayName,
  simulacrumDisplayName,
  iconWeaponId,
  elementalIcon,
  type,
  iconSize,
  showWeaponDescription = true,
}: WeaponDefinitionCardContentProps) {
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
      <WeaponIcon weaponId={id} iconWeaponId={iconWeaponId} size={iconSize} />

      {showWeaponDescription && (
        <Stack sx={{ pr: 2 }}>
          <Typography variant="body1">{weaponDisplayName}</Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            {simulacrumDisplayName}
          </Typography>

          <Stack direction="row">
            <ElementalTypeIcon elementalType={elementalIcon} />
            <WeaponTypeIcon type={type} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
