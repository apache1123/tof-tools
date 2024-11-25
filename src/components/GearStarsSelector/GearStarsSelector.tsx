import type { SxProps } from "@mui/material";
import { Rating } from "@mui/material";

export interface GearStarsSelectorProps {
  stars: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "small" | "medium";
  sx?: SxProps;

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
