import { Stack, Typography } from "@mui/material";

import type { FusionWeaponElementalType } from "../../../definitions/elemental-type";
import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponType } from "../../../definitions/weapons/weapon-type";
import { ElementalTypeIcon } from "../ElementalTypeIcon/ElementalTypeIcon";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";
import { WeaponTypeIcon } from "../WeaponTypeIcon/WeaponTypeIcon";

export interface WeaponDefinitionCardContentProps {
  id: WeaponName;
  weaponDisplayName: string;
  simulacrumDisplayName: string;
  elementalIcon: FusionWeaponElementalType;
  type: WeaponType;
}

export function WeaponDefinitionCardContent({
  id,
  weaponDisplayName,
  simulacrumDisplayName,
  elementalIcon,
  type,
}: WeaponDefinitionCardContentProps) {
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
      <WeaponIcon weaponName={id} />

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
    </Stack>
  );
}
