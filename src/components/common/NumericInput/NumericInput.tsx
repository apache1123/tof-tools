import type {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import BigNumber from "bignumber.js";
import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { getNumberSeparators } from "../../../utils/locale-utils";
import { toPercentageString2dp } from "../../../utils/number-utils";

export interface NumericInputProps {
  value?: number;
  onChangeCommitted?: (value: number) => unknown;
  onBlur?: () => unknown;

  label?: ReactNode;
  name?: string;
  id?: string;
  variant?: TextFieldVariants;
  size?: TextFieldProps["size"];
  /** Show & input number as a % */
  percentageMode?: boolean;
  min?: number;
  allowNegative?: boolean;
  decimalScale?: number;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  "aria-label"?: string;
}

const { decimalSeparator, groupSeparator } = getNumberSeparators();

export const NumericInput = ({
  value,
  onChangeCommitted,
  onBlur,
  percentageMode = false,
  min,
  variant = "outlined",
  allowNegative = false,
  decimalScale = 3,
  fullWidth = true,
  ...rest
}: NumericInputProps) => {
  // Temp/unconfirmed value (may not be "valid") while the user is typing and will be "committed" when the user leaves the input or presses enter. This is the value shown in the input
  const [uncommittedValue, setUncommittedValue] = useState<number | undefined>(
    value,
  );

  // Sync the uncommitted value with the value prop when it changes
  useEffect(() => {
    setUncommittedValue(value);
  }, [value]);

  const handleCommitChange = () => {
    if (onChangeCommitted && uncommittedValue !== value) {
      if (min !== undefined && (uncommittedValue ?? 0) < min) {
        // Reject the change if the changed value is less than the minimum, and revert it back to previous value.
        // If the previous value is lower than the minimum, then commit the minimum instead.
        if ((value ?? 0) >= min) {
          setUncommittedValue(value);
        } else {
          setUncommittedValue(min);
          onChangeCommitted(min);
        }

        return;
      }

      onChangeCommitted(uncommittedValue ?? 0);
    }
  };

  const hasError =
    min !== undefined &&
    (uncommittedValue === undefined || uncommittedValue < min);

  return (
    <NumericFormat
      value={
        percentageMode
          ? uncommittedValue !== undefined
            ? BigNumber(uncommittedValue).multipliedBy(100).toNumber()
            : undefined
          : uncommittedValue
      }
      onValueChange={(values) => {
        const value = percentageMode
          ? values.floatValue !== undefined
            ? BigNumber(values.floatValue).dividedBy(100).toNumber()
            : undefined
          : values.floatValue;
        setUncommittedValue(value);
      }}
      thousandSeparator={groupSeparator}
      decimalSeparator={decimalSeparator}
      allowedDecimalSeparators={[decimalSeparator]}
      allowNegative={allowNegative}
      decimalScale={decimalScale}
      suffix={percentageMode ? "%" : undefined}
      customInput={TextField}
      inputProps={{ inputMode: "decimal" }}
      onBlur={() => {
        onBlur?.();
        handleCommitChange();
      }}
      onKeyUp={(event: KeyboardEvent) => {
        if (event.key === "Enter") handleCommitChange();
      }}
      variant={variant}
      fullWidth={fullWidth}
      error={hasError}
      helperText={
        hasError
          ? `Minimum is ${percentageMode ? toPercentageString2dp(min) : min}`
          : " "
      } // Passing a space to keep layout consistent: https://v5.mui.com/material-ui/react-text-field/#helper-text
      {...rest}
    />
  );
};
