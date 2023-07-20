import BigNumber from 'bignumber.js';

export function additiveSum(values: number[]): BigNumber {
  return values
    .map((value) => BigNumber(value))
    .reduce((prev, current) => prev.plus(current), BigNumber(0));
}
