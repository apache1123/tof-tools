import { Rating } from "@mui/material";

import { maxNumOfMatrixStars } from "../../../definitions/matrices/matrix";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface MatrixStarsSelectorProps extends PropsWithSx {
  stars: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "small" | "medium";

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
