import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Image from 'next/image';

import type { WeaponName } from '../../constants/weapon-definitions';

export interface WeaponIconProps {
  weaponName: WeaponName | undefined;
  size?: number;
}

export const WeaponIcon = ({ weaponName, size = 100 }: WeaponIconProps) => {
  if (weaponName) {
    const imageName = weaponName.toLowerCase().replaceAll(' ', '-');
    const imagePath = `/icons/weapons/${imageName}.png`;

    return (
      <Image
        src={imagePath}
        alt={weaponName}
        width={size}
        height={size}
      ></Image>
    );
  }
  return <QuestionMarkIcon width={size} height={size} />;
};
