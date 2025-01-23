import BigNumber from "bignumber.js";

/** Returns the sum of a group of numbers */
export function sum(...values: BigNumber.Value[]): BigNumber {
  return values.reduce<BigNumber>(
    (sum, value) => sum.plus(value),
    BigNumber(0),
  );
}

/** Returns the product (multiplication) of a group of numbers */
export function product(...values: BigNumber.Value[]): BigNumber {
  return values.reduce<BigNumber>(
    (product, value) => product.times(value),
    BigNumber(1),
  );
}

/** Returns the relative increase of the `value` number compared to the `basis` number.
 * @example
 * - relativeIncrease(120, 100) // 0.2
 * - relativeIncrease(80, 100) // -0.2
 */
export function calculateRelativeIncrease(
  value: BigNumber.Value,
  basis: BigNumber.Value,
): number {
  return BigNumber(value).dividedBy(basis).minus(1).toNumber();
}
