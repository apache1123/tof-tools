import { Rating } from '@mui/material';

export interface GearStarsSelectorProps {
  stars: number;
  onStarsChange?(value: number): void;
}

export const GearStarsSelector = ({
  stars,
  onStarsChange,
}: GearStarsSelectorProps) => (
  <Rating
    value={stars ?? 0}
    onChange={(event, value) => {
      if (onStarsChange) onStarsChange(value ?? 0);
    }}
  />
);
