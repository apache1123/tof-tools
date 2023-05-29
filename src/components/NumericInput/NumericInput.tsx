import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export interface NumericInputProps {
  value: number;
  onChange: (value: number) => unknown;
  label?: string;
  name?: string;
  id?: string;
  variant?: TextFieldVariants;
  allowNegative?: boolean;
  decimalScale?: number;
  prefix?: string;
  suffix?: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumericInput = ({
  value,
  onChange,
  label,
  name,
  id,
  variant = 'standard',
  allowNegative = false,
  decimalScale = 2,
  prefix,
  suffix,
}: NumericInputProps) => {
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
          allowNegative={allowNegative}
          decimalScale={decimalScale}
          prefix={prefix}
          suffix={suffix}
        />
      );
    }
  );

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        InputProps: { inputComponent: NumericFormatCustom as any },
        variant,
      }}
    />
  );
};
