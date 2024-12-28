import { Rating } from "@mui/material";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface GearStarsSelectorProps extends PropsWithSx {
  stars: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "small" | "medium";

  onStarsChange?(value: number): void;
}

export const GearStarsSelector = ({
  stars,
  readOnly,
  disabled,
  size = "medium",
  sx,
  onStarsChange,
}: GearStarsSelectorProps) => (
  <Rating
    value={stars ?? 0}
    readOnly={readOnly}
    disabled={disabled}
    size={size}
    onChange={(event, value) => {
      if (onStarsChange) onStarsChange(value ?? 0);
    }}
    sx={{ ...sx }}
  />
);
