import { Box, Stack } from "@mui/material";

import type { WeaponDefinition } from "../../../definitions/types/weapon/weapon-definition";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { ElementalStyledText } from "../../elemental/ElementalStyledText/ElementalStyledText";
import { WeaponIcon } from "../WeaponIcon/WeaponIcon";

export interface WeaponIconWithElementsProps extends PropsWithSx {
  definition: WeaponDefinition;
}

export function WeaponIconWithElements({
  definition,
  sx,
}: WeaponIconWithElementsProps) {
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: "center", ...sx }}>
      <WeaponIcon
        weaponId={definition.id}
        iconWeaponId={definition.iconWeaponId}
        elementalIcon={definition.elementalIcon}
      />
      <Stack>
        <Box>
          Damage:{" "}
          <ElementalStyledText elementalType={definition.damageElement}>
            {definition.damageElement}
          </ElementalStyledText>
        </Box>
        <Box>
          Resonance:{" "}
          {definition.gearResonanceElements.map((element) => (
            <ElementalStyledText key={element} elementalType={element}>
              {element}{" "}
            </ElementalStyledText>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}
