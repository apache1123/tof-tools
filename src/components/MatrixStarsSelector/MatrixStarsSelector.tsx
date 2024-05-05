import { Rating } from '@mui/material';

import { maxNumOfMatrixStars } from '../../constants/matrix';

export interface MatrixStarsSelectorProps {
  stars: number;
  onStarsChange?(value: number): void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

export function MatrixStarsSelector({
  stars,
  onStarsChange,
  disabled,
  size,
}: MatrixStarsSelectorProps) {
  return (
    <Rating
      value={stars ?? 0}
      onChange={(event, value) => {
        if (onStarsChange) onStarsChange(value ?? 0);
      }}
      max={maxNumOfMatrixStars}
      disabled={disabled}
      size={size}
    />
  );
}
