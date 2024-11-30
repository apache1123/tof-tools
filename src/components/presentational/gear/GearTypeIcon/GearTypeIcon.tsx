import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Image from "next/image";

import type { GearName } from "../../../../definitions/gear-types";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";

export interface GearTypeIconProps {
  gearName: GearName | undefined;
  size?: number;
  isTitan?: boolean;
  monochromeBlack?: boolean;
  monochromeWhite?: boolean;
}

export const GearTypeIcon = ({
  gearName,
  size = 80,
  isTitan = false,
  monochromeBlack,
  monochromeWhite,
}: GearTypeIconProps) => {
  if (gearName) {
    const imageName = normalCaseToKebabCase(gearName);
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
        alt={gearName}
        title={gearName}
        width={size}
        height={size}
      ></Image>
    );
  }
  return <QuestionMarkIcon width={size} height={size} />;
};
