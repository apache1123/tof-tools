import Image from 'next/image';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { GearName } from '../../types';

export interface GearTypeIconProps {
  gearName: GearName;
  size?: number;
}

export const GearTypeIcon = ({ gearName, size = 80 }: GearTypeIconProps) => {
  if (gearName) {
    const imageName = gearName.toLowerCase().replaceAll(' ', '-');
    const imagePath = `/icons/gear/${imageName}.png`;

    return (
      <Image src={imagePath} alt={gearName} width={size} height={size}></Image>
    );
  }
  return <QuestionMarkIcon width={size} height={size} />;
};
