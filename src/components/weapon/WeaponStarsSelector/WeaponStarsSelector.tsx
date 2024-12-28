import type { RatingProps } from "@mui/material";
import { Rating } from "@mui/material";

import { maxNumOfWeaponStars } from "../../../definitions/weapons/weapon-stars";

export interface WeaponStarsSelectorProps {
  stars: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: RatingProps["size"];

  onStarsChange?(value: number): void;
}

export function WeaponStarsSelector({
  stars,
  readOnly,
  onStarsChange,
  disabled,
  size,
}: WeaponStarsSelectorProps) {
  return (
    <Rating
      value={stars ?? 0}
      onChange={(event, value) => {
        if (onStarsChange) onStarsChange(value ?? 0);
      }}
      max={maxNumOfWeaponStars}
      readOnly={readOnly}
      disabled={disabled}
      size={size}
    />
  );
}
