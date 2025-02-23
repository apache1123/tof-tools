import { Stack } from "@mui/material";

import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponDisplayProps {
  weaponId: WeaponDefinitionId;
  iconWeaponId: WeaponDefinitionId | undefined;
  stars: number;
}

export function WeaponDisplay({
  weaponId,
  iconWeaponId,
  stars,
}: WeaponDisplayProps) {
  return (
    <Stack alignItems="center">
      <WeaponIcon weaponId={weaponId} iconWeaponId={iconWeaponId} />
      <WeaponStarsSelector stars={stars} disabled />
    </Stack>
  );
}
