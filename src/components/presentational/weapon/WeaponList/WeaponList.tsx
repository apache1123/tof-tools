import { Stack } from "@mui/material";

import type { Weapon, WeaponId } from "../../../../models/weapon/weapon";
import { WeaponCard } from "../WeaponCard/WeaponCard";

export interface WeaponListProps {
  weapons: Weapon[];
  onClick?: (id: WeaponId) => void;
}

export function WeaponList({ weapons, onClick }: WeaponListProps) {
  return (
    <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
      {weapons.map((weapon) => (
        <WeaponCard
          key={weapon.id}
          weapon={weapon}
          onClick={() => {
            if (onClick) {
              onClick(weapon.id);
            }
          }}
          sx={{ width: 280 }}
        />
      ))}
    </Stack>
  );
}
