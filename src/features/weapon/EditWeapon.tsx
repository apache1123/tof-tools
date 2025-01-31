import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { WeaponDefinitionCardContent } from "../../components/weapon/WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../../components/weapon/WeaponStarsSelector/WeaponStarsSelector";
import type { Weapon } from "../../models/weapon/weapon";

export interface EditWeaponProps {
  weaponProxy: Weapon;
}

export function EditWeapon({ weaponProxy }: EditWeaponProps)
{
  const weapon = useSnapshot(weaponProxy);
  const {
    definitionId,
    weaponDisplayName,
    simulacrumDisplayName,
    iconWeaponName,
    elementalIcon,
    type,
    stars,
  } = weapon;

  return <Stack sx={{ alignItems: "center" }}>
    <WeaponDefinitionCardContent
      id={definitionId}
      weaponDisplayName={weaponDisplayName}
      simulacrumDisplayName={simulacrumDisplayName}
      iconWeaponName={iconWeaponName}
      elementalIcon={elementalIcon}
      type={type}
      iconSize={120}
    />
    <WeaponStarsSelector
      stars={stars}
      onStarsChange={(stars) => {
        weaponProxy.stars = stars;
      }}
    />
  </Stack>
}