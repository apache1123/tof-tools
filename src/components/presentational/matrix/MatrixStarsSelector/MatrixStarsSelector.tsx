import type { SxProps } from "@mui/material";
import { Rating } from "@mui/material";

import { maxNumOfMatrixStars } from "../../../../definitions/matrices/matrix";

export interface MatrixStarsSelectorProps {
  stars: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "small" | "medium";
  sx?: SxProps;

  onStarsChange?(value: number): void;
}

export function MatrixStarsSelector({
  stars,
  readOnly,
  disabled,
  size,
  sx,
  onStarsChange,
}: MatrixStarsSelectorProps) {
  return (
    <Rating
      value={stars ?? 0}
      onChange={(event, value) => {
        if (onStarsChange) onStarsChange(value ?? 0);
      }}
      max={maxNumOfMatrixStars}
      readOnly={readOnly}
      disabled={disabled}
      size={size}
      sx={sx}
    />
  );
}
