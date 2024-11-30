import type { TextFieldVariants } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";
import { NumericFormat } from "react-number-format";

import { getNumberSeparators } from "../../../../utils/locale-utils";

export interface NumericInputProps {
  value?: number;
  onChange?: (value: number) => unknown;
  label?: ReactNode;
  name?: string;
  id?: string;
  variant?: TextFieldVariants;
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
  variant = "standard",
  allowNegative = false,
  decimalScale = 3,
  fullWidth = true,
  ...rest
}: NumericInputProps) => {
  return (
    <NumericFormat
      onValueChange={(values) => {
        if (onChange) {
          onChange(values.floatValue ?? 0);
        }
      }}
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
