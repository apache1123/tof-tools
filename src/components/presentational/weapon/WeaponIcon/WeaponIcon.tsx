import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box } from "@mui/material";
import Image from "next/image";

import type { FusionWeaponElementalType } from "../../../../definitions/elemental-type";
import type { WeaponName } from "../../../../definitions/weapons/weapon-definitions";
import type { WeaponType } from "../../../../definitions/weapons/weapon-type";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";
import { ElementalTypeIcon } from "../../elemental/ElementalTypeIcon/ElementalTypeIcon";
import { WeaponTypeIcon } from "../WeaponTypeIcon/WeaponTypeIcon";

export interface WeaponIconProps {
  weaponName: WeaponName | undefined;
  size?: number;
  /** If defined, will overlay the elemental type icon on top of the weapon icon */
  elementalIcon?: FusionWeaponElementalType;
  /** If defined, will overlay the weapon type icon on top of the weapon icon */
  weaponType?: WeaponType;
}

export const WeaponIcon = ({
  weaponName,
  size = 100,
  elementalIcon,
  weaponType,
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
