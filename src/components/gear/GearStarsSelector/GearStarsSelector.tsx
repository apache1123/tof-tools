import { Rating } from "@mui/material";

import type { HasSxProps } from "../../__helpers__/has-sx-props";

export interface GearStarsSelectorProps extends HasSxProps {
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
