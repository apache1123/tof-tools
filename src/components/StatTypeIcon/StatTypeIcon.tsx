import QuestionMark from '@mui/icons-material/QuestionMark';
import Image from 'next/image';

import type { StatType } from '../../models/stat-type';

interface StatTypeIconProps {
  statType: StatType | undefined;
  size?: number;
}

export const StatTypeIcon = ({ statType, size = 30 }: StatTypeIconProps) => {
  if (statType) {
    const imageName = statType.iconImageName;
    const imagePath = `/icons/stats/${imageName}`;

    return (
      <Image src={imagePath} alt={imageName} width={size} height={size}></Image>
    );
  } else {
    return <QuestionMark width={size} height={size} />;
  }
};
