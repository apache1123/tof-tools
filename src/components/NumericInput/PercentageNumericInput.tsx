import BigNumber from 'bignumber.js';

import type { NumericInputProps } from './NumericInput';
import { NumericInput } from './NumericInput';

export type PercentageNumericInputProps = NumericInputProps;

export const PercentageNumericInput = ({
  value,
  onChange,
  ...others
}: PercentageNumericInputProps) => {
  const handleChange = (value: number) => {
    if (onChange) onChange(BigNumber(value).dividedBy(100).toNumber());
  };
  return (
    <NumericInput
      {...others}
      value={value ? BigNumber(value).multipliedBy(100).toNumber() : undefined}
      onChange={handleChange}
      suffix="%"
    />
  );
};
