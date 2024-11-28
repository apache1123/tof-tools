import { Stack } from "@mui/material";

import type { Weapon } from "../../../models/weapon/weapon";
import { WeaponCard } from "../WeaponCard/WeaponCard";

export interface WeaponListProps {
  weapons: Weapon[];
  onClick?: (weapon: Weapon) => void;
}

export function WeaponList({ weapons }: WeaponListProps) {
  return (
    <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
      {weapons.map((weapon) => (
        <WeaponCard key={weapon.id} weapon={weapon} sx={{ width: 280 }} />
      ))}
    </Stack>
  );
}
