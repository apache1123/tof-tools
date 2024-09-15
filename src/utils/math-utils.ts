import BigNumber from 'bignumber.js';

/** Returns the sum of a group of numbers */
export function sum(...values: BigNumber.Value[]): BigNumber {
  return values.reduce<BigNumber>(
    (sum, value) => sum.plus(value),
    BigNumber(0)
  );
}

/** Returns the product (multiplication) of a group of numbers */
export function product(...values: BigNumber.Value[]): BigNumber {
  return values.reduce<BigNumber>(
    (product, value) => product.times(value),
    BigNumber(1)
  );
}
