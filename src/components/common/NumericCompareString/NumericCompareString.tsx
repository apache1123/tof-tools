import { Typography } from "@mui/material";
import BigNumber from "bignumber.js";

import { getComparisonColor } from "../../../utils/color-utils";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import type { NumericStringProps } from "../NumericString/NumericString";
import { NumericString } from "../NumericString/NumericString";

export interface NumericCompareStringProps extends PropsWithSx {
  value: number;
  otherValue: number;
  variant: "integer" | "percentage2dp";
}

/** Show the value, and its difference compared to the other value */
export function NumericCompareString({
  value,
  otherValue,
  variant,
  sx,
}: NumericCompareStringProps) {
  const color = getComparisonColor(value >= otherValue);

  const difference = BigNumber(value).minus(otherValue).toNumber();

  let differenceVariant: NumericStringProps["variant"];
  switch (variant) {
    case "integer":
      differenceVariant = "signedInteger";
      break;
    case "percentage2dp":
      differenceVariant = "signedPercentage2dp";
      break;
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }

  return (
    <Typography component="span" sx={{ color, ...sx }}>
      <NumericString value={value} variant={variant} /> (
      <NumericString value={difference} variant={differenceVariant} />)
    </Typography>
  );
}
