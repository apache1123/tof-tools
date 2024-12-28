import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box } from "@mui/material";
import Image from "next/image";

import type { RelicName } from "../../../definitions/relics";
import { normalCaseToKebabCase } from "../../../utils/string-utils";

export interface RelicIconProps {
  relicName: RelicName | undefined;
  size?: number;
}

export const RelicIcon = ({ relicName, size = 100 }: RelicIconProps) => {
  if (relicName) {
    const imageName = normalCaseToKebabCase(relicName);
    const imagePath = `/icons/relics/${imageName}.webp`;

    return (
      <Image
        src={imagePath}
        alt={relicName}
        title={relicName}
        width={size}
        height={size}
      ></Image>
    );
  }
  return (
    <Box minHeight={size} display="flex" alignItems="center">
      <QuestionMarkIcon width={size} height={size} />
    </Box>
  );
};
