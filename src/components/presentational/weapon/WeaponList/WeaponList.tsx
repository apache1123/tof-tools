import { Stack } from "@mui/material";

import type { WeaponName } from "../../../../definitions/weapons/weapon-definitions";
import type { Weapon } from "../../../../models/weapon/weapon";
import { WeaponCard } from "../WeaponCard/WeaponCard";

export interface WeaponListProps {
  weapons: Weapon[];
  onClick?: (id: WeaponName) => void;
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
