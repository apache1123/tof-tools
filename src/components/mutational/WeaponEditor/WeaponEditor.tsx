import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import type { Weapon } from "../../../models/weapon/weapon";
import { WeaponDefinitionCardContent } from "../../presentational/WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../../presentational/WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponEditorProps {
  weaponState: Weapon;
}

export function WeaponEditor({ weaponState }: WeaponEditorProps) {
  const {
    id,
    weaponDisplayName,
    simulacrumDisplayName,
    elementalIcon,
    type,
    stars,
  } = useSnapshot(weaponState);

  return (
    <Stack sx={{ gap: 2, alignItems: "center" }}>
      <WeaponDefinitionCardContent
        id={id}
        weaponDisplayName={weaponDisplayName}
        simulacrumDisplayName={simulacrumDisplayName}
        elementalIcon={elementalIcon}
        type={type}
      />
      <WeaponStarsSelector
        stars={stars}
        onStarsChange={(stars) => {
          weaponState.stars = stars;
        }}
      />
    </Stack>
  );
}
