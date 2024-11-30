import { Stack } from "@mui/material";

import type { WeaponName } from "../../../../definitions/weapons/weapon-definitions";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponDisplayProps {
  weaponName: WeaponName;
  stars: number;
}

export function WeaponDisplay({ weaponName, stars }: WeaponDisplayProps) {
  return (
    <Stack alignItems="center">
      <WeaponIcon weaponName={weaponName} />
      <WeaponStarsSelector stars={stars} disabled />
    </Stack>
  );
}
