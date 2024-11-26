import { Rating } from "@mui/material";

import { maxNumOfMatrixStars } from "../../../definitions/matrix";

export interface MatrixStarsSelectorProps {
  stars: number;
  disabled?: boolean;
  size?: "small" | "medium";

  onStarsChange?(value: number): void;
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
