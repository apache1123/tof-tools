import Image from 'next/image';

import type { SimulacrumName } from '../../definitions/simulacrum-traits';
import { normalCaseToKebabCase } from '../../utils/string-utils';

export interface SimulacrumIconProps {
  simulacrumName: SimulacrumName;
  size?: number;
}

export const SimulacrumIcon = ({
  simulacrumName,
  size = 100,
}: SimulacrumIconProps) => {
  const imageName = normalCaseToKebabCase(simulacrumName);
  const imagePath = `/icons/simulacra/${imageName}.webp`;

  return (
    <Image
      src={imagePath}
      alt={simulacrumName}
      title={simulacrumName}
      width={size}
      height={size}
    />
  );
};
