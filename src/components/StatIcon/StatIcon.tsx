import Image from 'next/image';
import { StatDefinition } from '../../types';
import QuestionMark from '@mui/icons-material/QuestionMark';

interface StatIconProps {
  statDefinition: StatDefinition;
  size?: number;
}

export const StatIcon = ({ statDefinition, size = 30 }: StatIconProps) => {
  if (statDefinition) {
    const imageName = statDefinition.iconImageName;
    const imagePath = `/icons/stats/${imageName}`;

    return (
      <Image src={imagePath} alt={imageName} width={size} height={size}></Image>
    );
  } else {
    return <QuestionMark width={size} height={size} />;
  }
};
