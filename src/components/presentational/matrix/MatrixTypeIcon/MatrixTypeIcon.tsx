import type { SxProps } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";

import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";

export interface MatrixTypeIconProps {
  id: MatrixTypeId;
  displayName: string;
  variant?: "small" | "large";
  size?: number;
  sx?: SxProps;
}

export function MatrixTypeIcon({
  id,
  displayName,
  variant = "small",
  size = 70,
  sx,
}: MatrixTypeIconProps) {
  const imageName = normalCaseToKebabCase(id);
  const imagePath = `/icons/matrices/matrix-types/${variant}/${imageName}.png`;

  return (
    <Box sx={sx}>
      <Image
        src={imagePath}
        alt={displayName}
        title={displayName}
        width={size}
        height={size}
      ></Image>
    </Box>
  );
}
