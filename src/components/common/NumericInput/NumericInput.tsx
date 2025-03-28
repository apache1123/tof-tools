import type {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import debounceFn from "lodash.debounce";
import type { KeyboardEvent, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";

import { getNumberSeparators } from "../../../utils/locale-utils";

export interface NumericInputProps {
  value?: number;
  onChange?: (value: number) => unknown;
  onChangeCommitted?: (value: number) => unknown;
  /** onChange debounce */
  debounce?: boolean;
  onBlur?: () => unknown;

  label?: ReactNode;
  name?: string;
  id?: string;
  variant?: TextFieldVariants;
  size?: TextFieldProps["size"];
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
  onChange,
  onChangeCommitted,
  debounce = true,
  onBlur,
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

  const handleChange = useCallback(
    (value: number | undefined) => {
      if (onChange) {
        onChange(value ?? 0);
      }
    },
    [onChange],
  );

  const debouncedHandleChange = useMemo(
    () => (debounce ? debounceFn(handleChange, 300) : handleChange),
    [debounce, handleChange],
  );

  const handleCommitChange = () => {
    if (onChangeCommitted && uncommittedValue !== value) {
      onChangeCommitted(uncommittedValue ?? 0);
    }
  };

  return (
    <NumericFormat
      value={uncommittedValue}
      onValueChange={(values) => {
        const value = values.floatValue;
        setUncommittedValue(value);
        debouncedHandleChange(value);
      }}
      thousandSeparator={groupSeparator}
      decimalSeparator={decimalSeparator}
      allowedDecimalSeparators={[decimalSeparator]}
      allowNegative={allowNegative}
      decimalScale={decimalScale}
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
      {...rest}
    />
  );
};
