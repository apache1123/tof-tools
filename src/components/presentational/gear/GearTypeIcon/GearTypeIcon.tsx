import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Image from "next/image";

import type { GearTypeId } from "../../../../definitions/gear-types";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";

export interface GearTypeIconProps {
  id: GearTypeId | undefined;
  size?: number;
  isTitan?: boolean;
  monochromeBlack?: boolean;
  monochromeWhite?: boolean;
}

export const GearTypeIcon = ({
  id,
  size = 80,
  isTitan = false,
  monochromeBlack,
  monochromeWhite,
}: GearTypeIconProps) => {
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
};
