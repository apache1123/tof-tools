import BigNumber from 'bignumber.js';

/** Returns the sum of a group of numbers */
export function sum(...values: number[]): BigNumber {
  return values.reduce((sum, value) => sum.plus(value), BigNumber(0));
}

/** Returns the product (multiplication) of a group of numbers */
export function product(...values: number[]): BigNumber {
  return values.reduce((product, value) => product.times(value), BigNumber(1));
}
