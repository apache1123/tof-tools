import { Rating } from "@mui/material";

import { maxNumOfWeaponStars } from "../../../definitions/weapons/weapon-stars";

export interface WeaponStarsSelectorProps {
  stars: number;
  readOnly?: boolean;
  disabled?: boolean;

  onStarsChange?(value: number): void;
}

export function WeaponStarsSelector({
  stars,
  readOnly,
  onStarsChange,
  disabled,
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
    />
  );
}
