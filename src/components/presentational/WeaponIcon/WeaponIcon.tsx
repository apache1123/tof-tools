import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box } from "@mui/material";
import Image from "next/image";

import type { FusionWeaponElementalType } from "../../../definitions/elemental-type";
import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import { normalCaseToKebabCase } from "../../../utils/string-utils";
import { ElementalTypeIcon } from "../ElementalTypeIcon/ElementalTypeIcon";

export interface WeaponIconProps {
  weaponName: WeaponName | undefined;
  size?: number;
  /** If defined, will overlay the elemental type icon on top of the weapon icon */
  elementalIcon?: FusionWeaponElementalType;
}

export const WeaponIcon = ({
  weaponName,
  size = 100,
  elementalIcon,
}: WeaponIconProps) => {
  if (weaponName) {
    const imageName = normalCaseToKebabCase(weaponName);
    const imagePath = `/icons/weapons/${imageName}.png`;

    return (
      <Box width={size} height={size} position={"relative"}>
        <Image
          src={imagePath}
          alt={weaponName}
          title={weaponName}
          width={size}
          height={size}
        ></Image>
        {elementalIcon && (
          <Box position={"absolute"} right={0} bottom={0}>
            <ElementalTypeIcon
              elementalType={elementalIcon}
              width={size / 4}
              height={size / 4}
            />
          </Box>
        )}
      </Box>
    );
  }
  return (
    <Box minHeight={size} display="flex" alignItems="center">
      <QuestionMarkIcon width={size} height={size} />
    </Box>
  );
};
