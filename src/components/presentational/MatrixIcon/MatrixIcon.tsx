import Image from "next/image";

import type { MatrixDefinitionId } from "../../../definitions/matrices/matrix-definitions";
import { normalCaseToKebabCase } from "../../../utils/string-utils";

export interface MatrixIconProps {
  matrixDefinitionId: MatrixDefinitionId;
  displayName: string;
  size?: number;
}

export const MatrixIcon = ({
  matrixDefinitionId,
  displayName,
  size = 100,
}: MatrixIconProps) => {
  const imageName = normalCaseToKebabCase(matrixDefinitionId);
  const imagePath = `/icons/matrices/${imageName}.webp`;

  return (
    <Image
      src={imagePath}
      alt={matrixDefinitionId}
      title={displayName}
      width={size}
      height={size}
    />
  );
};
