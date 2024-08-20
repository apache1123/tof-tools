import Image from 'next/image';

import type { FusionWeaponElementalType } from '../../constants/elemental-type';
import { pascalCaseToKebabCase } from '../../utils/string-utils';

export interface ElementalTypeIconProps {
  elementalType: FusionWeaponElementalType;
  width?: number;
  height?: number;
}

export function ElementalTypeIcon({
  elementalType,
  width = 24,
  height = 22,
}: ElementalTypeIconProps) {
  const imageName = pascalCaseToKebabCase(elementalType);
  const imagePath = `/icons/elements/${imageName}.webp`;

  return (
    <Image
      src={imagePath}
      alt={`${imageName}-icon`}
      title={elementalType}
      width={width}
      height={height}
    />
  );
}
