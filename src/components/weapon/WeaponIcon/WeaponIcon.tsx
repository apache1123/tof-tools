import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box } from "@mui/material";
import Image from "next/image";

import type { FusionWeaponElementalType } from "../../../definitions/elemental-type";
import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponType } from "../../../definitions/weapons/weapon-type";
import { normalCaseToKebabCase } from "../../../utils/string-utils";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { ElementalTypeIcon } from "../../elemental/ElementalTypeIcon/ElementalTypeIcon";
import { WeaponTypeIcon } from "../WeaponTypeIcon/WeaponTypeIcon";

export interface WeaponIconProps extends PropsWithSx {
  weaponId: WeaponDefinitionId | undefined;
  /** Optional. The weapon's icon will be inferred from the id if not provided. This is used when the weapon has a different id than the icon name, e.g. id="Nola (Altered)", id="Nola (Frost)", etc. all use "Nola" icon */
  iconWeaponId: WeaponDefinitionId | undefined;
  size?: number;
  /** If defined, will overlay the elemental type icon on top of the weapon icon */
  elementalIcon?: FusionWeaponElementalType;
  /** If defined, will overlay the weapon type icon on top of the weapon icon */
  weaponType?: WeaponType;
}

export const WeaponIcon = ({
  weaponId,
  iconWeaponId,
  size = 100,
  elementalIcon,
  weaponType,
  sx,
}: WeaponIconProps) => {
  if (weaponId) {
    const imageName = normalCaseToKebabCase(iconWeaponId ?? weaponId);
    const imagePath = `/icons/weapons/${imageName}.png`;

    return (
      <Box width={size} height={size} position={"relative"} sx={sx}>
        <Image
          src={imagePath}
          alt={weaponId}
          title={weaponId}
          width={size}
          height={size}
        ></Image>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "flex-end",
          }}
        >
          {elementalIcon && (
            <ElementalTypeIcon
              elementalType={elementalIcon}
              width={size / 4}
              height={size / 4}
            />
          )}
          {weaponType && <WeaponTypeIcon type={weaponType} size={size / 4} />}
        </Box>
      </Box>
    );
  }
  return (
    <Box minHeight={size} display="flex" alignItems="center">
      <QuestionMarkIcon width={size} height={size} />
    </Box>
  );
};
