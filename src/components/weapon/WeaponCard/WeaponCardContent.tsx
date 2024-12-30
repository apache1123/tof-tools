import { Stack } from "@mui/material";

import type { MatrixSlot } from "../../../models/matrix/matrix-slot";
import type { Weapon } from "../../../models/weapon/weapon";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { CardList } from "../../common/CardList/CardList";
import { MatrixSlotIcon } from "../../matrix/MatrixSlotIcon/MatrixSlotIcon";
import { WeaponDefinitionCardContent } from "../WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../WeaponStarsSelector/WeaponStarsSelector";

export interface WeaponCardContentProps
  extends PropsWithElevation,
    PropsWithSx {
  weapon: Weapon;
  showWeaponDescription?: boolean;
  matrixSlots?: MatrixSlot[];
}

export function WeaponCardContent({
  weapon,
  showWeaponDescription = true,
  matrixSlots,
  elevation,
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

      {matrixSlots && (
        <CardList gap={0.5}>
          {matrixSlots.map((slot) => (
            <MatrixSlotIcon
              key={slot.acceptsType.id}
              type={slot.acceptsType}
              matrix={slot.matrix}
              elevation={(elevation ?? 0) + 1}
            />
          ))}
        </CardList>
      )}
    </Stack>
  );
}
