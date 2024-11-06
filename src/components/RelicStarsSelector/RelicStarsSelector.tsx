import { Rating } from "@mui/material";

import { maxRelicStars } from "../../definitions/relics";

export interface RelicStarsSelectorProps {
  stars: number;
  onStarsChange?(value: number): void;
  disabled?: boolean;
}

export function RelicStarsSelector({
  stars,
  onStarsChange,
  disabled,
}: RelicStarsSelectorProps) {
  return (
    <Rating
      value={stars ?? 0}
      onChange={(event, value) => {
        if (onStarsChange) onStarsChange(value ?? 0);
      }}
      max={maxRelicStars}
      disabled={disabled}
    />
  );
}
