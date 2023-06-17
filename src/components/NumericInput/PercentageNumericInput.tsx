import BigNumber from 'bignumber.js';

import { NumericInput, NumericInputProps } from './NumericInput';

export type PercentageNumericInputProps = NumericInputProps;

export const PercentageNumericInput = ({
  value,
  onChange,
  ...others
}: PercentageNumericInputProps) => {
  const handleChange = (value: number) => {
    onChange(BigNumber(value).dividedBy(100).toNumber());
  };
  return (
    <NumericInput
      {...others}
      value={BigNumber(value).multipliedBy(100).toNumber()}
      onChange={handleChange}
      suffix="%"
    />
  );
};
