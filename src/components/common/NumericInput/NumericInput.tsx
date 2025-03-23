import type {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import debounceFn from "lodash.debounce";
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import type { NumberFormatValues } from "react-number-format";
import { NumericFormat } from "react-number-format";

import { getNumberSeparators } from "../../../utils/locale-utils";

export interface NumericInputProps {
  value?: number;
  onChange?: (value: number) => unknown;
  debounce?: boolean;

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
  onChange,
  debounce = true,
  variant = "outlined",
  allowNegative = false,
  decimalScale = 3,
  fullWidth = true,
  ...rest
}: NumericInputProps) => {
  const handleChange = useCallback(
    (values: NumberFormatValues) => {
      if (onChange) {
        onChange(values.floatValue ?? 0);
      }
    },
    [onChange],
  );

  const debouncedHandleChange = useMemo(
    () => (debounce ? debounceFn(handleChange, 300) : handleChange),
    [debounce, handleChange],
  );

  return (
    <NumericFormat
      onValueChange={debouncedHandleChange}
      thousandSeparator={groupSeparator}
      decimalSeparator={decimalSeparator}
      allowedDecimalSeparators={[decimalSeparator]}
      allowNegative={allowNegative}
      decimalScale={decimalScale}
      customInput={TextField}
      inputProps={{ inputMode: "decimal" }}
      variant={variant}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};
