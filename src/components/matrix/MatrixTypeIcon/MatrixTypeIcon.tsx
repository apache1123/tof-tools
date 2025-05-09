import { Box } from "@mui/material";
import Image from "next/image";

import type { MatrixTypeId } from "../../../models/matrix/matrix-type";
import { normalCaseToKebabCase } from "../../../utils/string-utils";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface MatrixTypeIconProps extends PropsWithSx {
  id: MatrixTypeId;
  displayName: string;
  variant?: "small" | "large";
  size?: number;
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
