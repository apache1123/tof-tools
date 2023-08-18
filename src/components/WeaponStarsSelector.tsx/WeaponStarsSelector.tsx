import { Rating } from '@mui/material';

import { maxNumOfWeaponStars } from '../../constants/weapon';

export interface WeaponStarsSelectorProps {
  stars: number;
  onStarsChange?(value: number): void;
  disabled?: boolean;
}

export function WeaponStarsSelector({
  stars,
  onStarsChange,
  disabled,
}: WeaponStarsSelectorProps) {
  return (
    <Rating
      value={stars ?? 0}
      onChange={(event, value) => {
        if (onStarsChange) onStarsChange(value ?? 0);
      }}
      max={maxNumOfWeaponStars}
      disabled={disabled}
    />
  );
}
