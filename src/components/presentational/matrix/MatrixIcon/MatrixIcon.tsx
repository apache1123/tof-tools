import type { SxProps } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";

import type { MatrixDefinitionId } from "../../../../definitions/matrices/matrix-definitions";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";

export interface MatrixIconProps {
  definitionId: MatrixDefinitionId;
  displayName: string;
  size?: number;
  sx?: SxProps;
}

export const MatrixIcon = ({
  definitionId,
  displayName,
  size = 100,
  sx,
}: MatrixIconProps) => {
  const imageName = normalCaseToKebabCase(definitionId);
  const imagePath = `/icons/matrices/${imageName}.webp`;

  return (
    <Box sx={sx}>
      <Image
        src={imagePath}
        alt={definitionId}
        title={displayName}
        width={size}
        height={size}
      />
    </Box>
  );
};
