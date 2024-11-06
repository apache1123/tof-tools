import { NoSsr } from "@mui/material";

import {
  toIntegerString,
  toPercentageString,
  toPercentageString2dp,
} from "../../utils/number-utils";

export function NumericStringPercentage({ value }: { value: number }) {
  return <NumericStringBase valueString={toPercentageString(value)} />;
}

export function NumericStringPercentage2dp({ value }: { value: number }) {
  return <NumericStringBase valueString={toPercentageString2dp(value)} />;
}

export function NumericStringInteger({ value }: { value: number }) {
  return <NumericStringBase valueString={toIntegerString(value)} />;
}

function NumericStringBase({
  value,
  valueString,
}: {
  value?: number;
  valueString?: string;
}) {
  return <NoSsr>{value ?? valueString}</NoSsr>;
}
