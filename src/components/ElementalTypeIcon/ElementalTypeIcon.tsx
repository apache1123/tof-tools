import Image from 'next/image';

import type { ElementalType } from '../../constants/elemental-type';
import { pascalCaseToCamelCase } from '../../utils/string-utils';

export interface ElementalTypeIconProps {
  elementalType: ElementalType;
  width?: number;
  height?: number;
}

export function ElementalTypeIcon({
  elementalType,
  width = 24,
  height = 22,
}: ElementalTypeIconProps) {
  const imageName = pascalCaseToCamelCase(elementalType);
  const imagePath = `/icons/elements/${imageName}.png`;

  return (
    <Image
      src={imagePath}
      alt={`${imageName}-icon`}
      width={width}
      height={height}
    />
  );
}
