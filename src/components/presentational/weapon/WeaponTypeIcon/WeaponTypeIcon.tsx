import Image from "next/image";

import type { WeaponType } from "../../../../definitions/weapons/weapon-type";
import { normalCaseToKebabCase } from "../../../../utils/string-utils";

export interface WeaponTypeIconProps {
  type: WeaponType;
  size?: number;
}

export function WeaponTypeIcon({ type, size = 24 }: WeaponTypeIconProps) {
  const imageName = normalCaseToKebabCase(type);
  const imagePath = `/icons/weapons/types/${imageName}.webp`;

  return (
    <Image
      src={imagePath}
      alt={`${imageName}-icon`}
      title={type}
      width={size}
      height={size}
    />
  );
}
