import { Box } from "@mui/material";
import Image from "next/image";

import type { MatrixDefinitionId } from "../../../definitions/matrices/matrix-definitions";
import { normalCaseToKebabCase } from "../../../utils/string-utils";
import type { HasSxProps } from "../../__helpers__/has-sx-props";

export interface MatrixIconProps extends HasSxProps {
  definitionId: MatrixDefinitionId;
  displayName: string;
  size?: number;
}

export const MatrixIcon = ({
  definitionId,
  displayName,
  size = 100,
  sx,
}: MatrixIconProps) => {
  const imageName = normalCaseToKebabCase(definitionId);
  const imagePath = `/icons/matrices/${imageName}.webp`;

  // Manipulate the placement of the image as the default matrix images have way too much padding. The result should be the image fitting inside the specified sized container with minimal margins
  const imageSize = size * 1.4;
  const imageOffset = (imageSize - size) / -2;

  return (
    <Box sx={{ width: size, height: size, position: "relative", ...sx }}>
      <Image
        src={imagePath}
        alt={definitionId}
        title={displayName}
        width={imageSize}
        height={imageSize}
        style={{ position: "absolute", top: imageOffset, left: imageOffset }}
      />
    </Box>
  );
};
