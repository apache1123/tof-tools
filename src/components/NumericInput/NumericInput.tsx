import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { forwardRef, ReactNode } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

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
}

interface CustomProps {
  value: number;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  allowNegative?: boolean;
  decimalScale?: number;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  }
);

export const NumericInput = ({
  value,
  onChange,
  label,
  name,
  id,
  variant = 'standard',
  allowNegative = false,
  decimalScale = 3,
  prefix,
  suffix,
  disabled,
  fullWidth = true,
  required,
  error,
  helperText,
}: NumericInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(+event.target.value);
  };

  return (
    <TextField
      {...{
        label,
        value,
        onChange: handleChange,
        name,
        id,
        InputProps: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent: NumericFormatCustom as any,
          inputProps: { allowNegative, decimalScale, prefix, suffix },
        },
        variant,
        disabled,
        fullWidth,
        required,
        error,
        helperText,
      }}
    />
  );
};
