import Image from "next/image";

import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";

export interface MatrixTypeIconProps {
  id: MatrixTypeId;
  displayName: string;
  size?: number;
}

export function MatrixTypeIcon({
  id,
  displayName,
  size = 70,
}: MatrixTypeIconProps) {
  const imageName = normalCaseToKebabCase(id);
  const imagePath = `/icons/matrices/matrix-types/${imageName}.png`;

  return (
    <Image
      src={imagePath}
      alt={displayName}
      title={displayName}
      width={size}
      height={size}
    ></Image>
  );
}
