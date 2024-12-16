import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import type { SxProps } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";

import type { GearTypeId } from "../../../../definitions/gear-types";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";

export interface GearTypeIconProps {
  id: GearTypeId | undefined;
  size?: number;
  isTitan?: boolean;
  monochromeBlack?: boolean;
  monochromeWhite?: boolean;
  sx?: SxProps;
}

export const GearTypeIcon = ({
  id,
  size = 80,
  isTitan = false,
  monochromeBlack,
  monochromeWhite,
  sx,
}: GearTypeIconProps) => {
  function Icon() {
    if (id) {
      const imageName = normalCaseToKebabCase(id);
      const imagePath = isTitan
        ? `/icons/gear/titan/${imageName}.png`
        : monochromeBlack
          ? `/icons/gear/monochrome/black/${imageName}.png`
          : monochromeWhite
            ? `/icons/gear/monochrome/white/${imageName}.png`
            : `/icons/gear/${imageName}.png`;

      return (
        <Image
          src={imagePath}
          alt={id}
          title={id}
          width={size}
          height={size}
        ></Image>
      );
    }
    return <QuestionMarkIcon width={size} height={size} />;
  }

  return (
    <Box sx={{ width: size, height: size, ...sx }}>
      <Icon />
    </Box>
  );
};
