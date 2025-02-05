import { Stack } from "@mui/material";

import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponDisplayProps {
  weaponName: WeaponName;
  iconWeaponName: WeaponName | undefined;
  stars: number;
}

export function WeaponDisplay({
  weaponName,
  iconWeaponName,
  stars,
}: WeaponDisplayProps) {
  return (
    <Stack alignItems="center">
      <WeaponIcon weaponName={weaponName} iconWeaponName={iconWeaponName} />
      <WeaponStarsSelector stars={stars} disabled />
    </Stack>
  );
}
