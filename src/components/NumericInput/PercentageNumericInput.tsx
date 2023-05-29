import { NumericInput, NumericInputProps } from './NumericInput';

export type PercentageNumericInputProps = NumericInputProps;

export const PercentageNumericInput = ({
  value,
  onChange,
  ...others
}: PercentageNumericInputProps) => {
  const handleChange = (value: number) => {
    onChange(value / 100);
  };
  return (
    <NumericInput
      {...others}
      value={value * 100}
      onChange={handleChange}
      suffix="%"
    />
  );
};
