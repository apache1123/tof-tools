import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box } from "@mui/material";
import Image from "next/image";
import type { CSSProperties } from "react";

import type { GearTypeId } from "../../../definitions/gear-types";
import type { GearRarity } from "../../../models/gear/gear-rarity";
import { normalCaseToKebabCase } from "../../../utils/string-utils";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface GearTypeIconProps extends PropsWithSx {
  id: GearTypeId | undefined;
  size?: number;
  rarity?: GearRarity;
  monochromeBlack?: boolean;
  monochromeWhite?: boolean;
}

export const GearTypeIcon = ({
  id,
  size = 80,
  rarity,
  monochromeBlack,
  monochromeWhite,
  sx,
}: GearTypeIconProps) => {
  const absoluteChildStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
  };

  function Icon() {
    if (id) {
      const imageName = normalCaseToKebabCase(id);

      const imagePath = monochromeBlack
        ? `/icons/gear/monochrome/black/${imageName}.png`
        : monochromeWhite
          ? `/icons/gear/monochrome/white/${imageName}.png`
          : rarity === "Titan"
            ? `/icons/gear/titan/${imageName}.png`
            : rarity === "Augmented"
              ? `/icons/gear/augmented/${imageName}.png`
              : `/icons/gear/${imageName}.png`;

      return (
        <Image
          src={imagePath}
          alt={id}
          title={id}
          width={size}
          height={size}
          style={absoluteChildStyle}
        />
      );
    }
    return (
      <QuestionMarkIcon width={size} height={size} style={absoluteChildStyle} />
    );
  }

  function Background() {
    if (id) {
      const backgroundImagePath =
        rarity === "Titan"
          ? "/icons/gear/background/color_red.png"
          : rarity === "Augmented" || rarity === "SSR"
            ? "/icons/gear/background/color_gold.png"
            : undefined;

      return (
        backgroundImagePath && (
          <Image
            src={backgroundImagePath}
            width={size}
            height={size}
            alt={id}
            title={id}
            style={absoluteChildStyle}
          />
        )
      );
    }

    return null;
  }

  return (
    <Box sx={{ width: size, height: size, position: "relative", ...sx }}>
      <Background />
      <Icon />
    </Box>
  );
};
