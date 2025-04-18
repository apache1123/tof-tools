import { Rating } from "@mui/material";

import type { BoxCheckboxProps } from "./BoxCheckbox";
import { BoxCheckbox } from "./BoxCheckbox";

export interface BoxCheckboxWithStarsProps
  extends Omit<BoxCheckboxProps, "onIsCheckedChange" | "additionalSelector"> {
  maxNumOfStars: number;
  stars: number;
  onChange?(isChecked: boolean, stars: number): void;
}

export function BoxCheckboxWithStars({
  maxNumOfStars,
  stars,
  onChange,
  isChecked,
  ...rest
}: BoxCheckboxWithStarsProps) {
  return (
    <BoxCheckbox
      additionalSelector={
        <Rating
          max={maxNumOfStars}
          value={stars ?? 0}
          onChange={(event, value) => {
            if (onChange) onChange(isChecked, value ?? 0);
          }}
        />
      }
      onIsCheckedChange={(isChecked) => {
        if (onChange) onChange(isChecked, stars ?? 0);
      }}
      {...{ isChecked, ...rest }}
    />
  );
}
