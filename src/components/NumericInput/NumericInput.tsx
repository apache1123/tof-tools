import type { TextFieldVariants } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';
import { NumericFormat } from 'react-number-format';

export interface NumericInputProps {
  value?: number;
  onChange?: (value: number) => unknown;
  label?: string;
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
  'aria-label'?: string;
}

export const NumericInput = ({
  onChange,
  variant = 'standard',
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
      thousandSeparator
      allowNegative={allowNegative}
      decimalScale={decimalScale}
      customInput={TextField}
      variant={variant}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};
