import { Stack } from "@mui/material";

import type { MatrixSlot } from "../../../../models/matrix/matrix-slot";
import type { Weapon } from "../../../../models/weapon/weapon";
import type { HasSxProps } from "../../../helpers/has-sx-props";
import { MatrixSlotIconList } from "../../matrix/MatrixSlotIconList/MatrixSlotIconList";
import { WeaponDefinitionCardContent } from "../WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponCardContentProps extends HasSxProps {
  weapon: Weapon;
  showWeaponDescription?: boolean;
  matrixSlots?: MatrixSlot[];
}

export function WeaponCardContent({
  weapon,
  showWeaponDescription = true,
  matrixSlots,
  sx,
}: WeaponCardContentProps) {
  const {
    definitionId,
    weaponDisplayName,
    simulacrumDisplayName,
    iconWeaponName,
    elementalIcon,
    type,
    stars,
  } = weapon;

  return (
    <Stack sx={{ gap: 2, alignItems: "center", ...sx }}>
      <Stack>
        <WeaponDefinitionCardContent
          id={definitionId}
          weaponDisplayName={weaponDisplayName}
          simulacrumDisplayName={simulacrumDisplayName}
          iconWeaponName={iconWeaponName}
          elementalIcon={elementalIcon}
          type={type}
          showWeaponDescription={showWeaponDescription}
        />
        <WeaponStarsSelector stars={stars} size="small" readOnly />
      </Stack>

      {matrixSlots && <MatrixSlotIconList matrixSlots={matrixSlots} />}
    </Stack>
  );
}
