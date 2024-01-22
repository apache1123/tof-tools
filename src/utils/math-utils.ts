import BigNumber from 'bignumber.js';

/** Returns the sum of an array of numbers */
export function additiveSum(values: number[]): BigNumber {
  return values.reduce((sum, value) => sum.plus(value), BigNumber(0));
}
