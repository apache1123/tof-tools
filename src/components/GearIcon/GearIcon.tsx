import Image from 'next/image';
import { GearName } from '../../types';

export interface GearIconProps {
  gearName: GearName;
  size?: number;
}

export const GearIcon = ({ gearName, size = 80 }: GearIconProps) => {
  const imageName = gearName.toLowerCase().replaceAll(' ', '-');
  const imagePath = `/icons/gear/${imageName}.png`;

  return (
    <Image src={imagePath} alt={gearName} width={size} height={size}></Image>
  );
};
