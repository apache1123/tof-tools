import { Rating } from '@mui/material';

export interface GearStarsSelectorProps {
  stars: number;
  onStarsChange?(value: number): void;
  disabled?: boolean;
}

export const GearStarsSelector = ({
  stars,
  onStarsChange,
  disabled,
}: GearStarsSelectorProps) => (
  <Rating
    value={stars ?? 0}
    onChange={(event, value) => {
      if (onStarsChange) onStarsChange(value ?? 0);
    }}
    disabled={disabled}
  />
);
