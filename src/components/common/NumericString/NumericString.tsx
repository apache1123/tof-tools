import { NoSsr } from "@mui/material";

import {
  toIntegerString,
  toPercentageString,
  toPercentageString2dp,
  toSignedIntegerString,
  toSignedPercentageString1dp,
  toSignedPercentageString2dp,
} from "../../../utils/number-utils";

export interface NumericStringProps {
  value: number;
  variant:
    | "integer"
    | "percentage"
    | "percentage2dp"
    | "signedInteger"
    | "signedPercentage1dp"
    | "signedPercentage2dp";
}

export function NumericString({ value, variant }: NumericStringProps) {
  let toString: (value: number) => string;
  switch (variant) {
    case "integer":
      toString = toIntegerString;
      break;
    case "percentage":
      toString = toPercentageString;
      break;
    case "percentage2dp":
      toString = toPercentageString2dp;
      break;
    case "signedInteger":
      toString = toSignedIntegerString;
      break;
    case "signedPercentage1dp":
      toString = toSignedPercentageString1dp;
      break;
    case "signedPercentage2dp":
      toString = toSignedPercentageString2dp;
      break;
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }

  const valueString = toString(value);

  return <NoSsr>{valueString}</NoSsr>;
}
