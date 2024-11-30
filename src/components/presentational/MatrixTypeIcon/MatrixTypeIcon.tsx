import Image from "next/image";

import type { MatrixTypeId } from "../../../models/matrix/matrix-type";
import { normalCaseToKebabCase } from "../../../utils/string-utils";

export interface MatrixTypeIconProps {
  id: MatrixTypeId;
  size?: number;
}

export function MatrixTypeIcon({ id, size = 70 }: MatrixTypeIconProps) {
  const imageName = normalCaseToKebabCase(id);
  const imagePath = `/icons/matrices/matrix-types/${imageName}.png`;

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
