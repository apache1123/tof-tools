import Image from "next/image";

import type { SimulacrumId } from "../../../definitions/simulacra/simulacrum-id";
import { normalCaseToKebabCase } from "../../../utils/string-utils";

export interface SimulacrumIconProps {
  simulacrumId: SimulacrumId;
  size?: number;
}

export const SimulacrumIcon = ({
  simulacrumId,
  size = 100,
}: SimulacrumIconProps) => {
  const imageName = normalCaseToKebabCase(simulacrumId);
  const imagePath = `/icons/simulacra/${imageName}.webp`;

  return (
    <Image
      src={imagePath}
      alt={simulacrumId}
      title={simulacrumId}
      width={size}
      height={size}
    />
  );
};
