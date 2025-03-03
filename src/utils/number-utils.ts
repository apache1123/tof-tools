export function toPercentageString(number: number) {
  return number.toLocaleString(undefined, { style: "percent" });
}

export function toPercentageString2dp(number: number) {
  return number.toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
  });
}

export function toSignedPercentageString1dp(number: number) {
  return number.toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "always",
  });
}

export function toSignedPercentageString2dp(number: number) {
  return number.toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
    signDisplay: "always",
  });
}

export function toIntegerString(number: number) {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
}

export function toSignedIntegerString(number: number) {
  return number.toLocaleString(undefined, {
    signDisplay: "always",
    maximumFractionDigits: 0,
  });
}

/** Returns the highest number from an array of numbers. */
export function getHighestNumber(array: number[]) {
  return array.reduce((prev, current) => Math.max(prev, current), 0);
}

/** Returns the item with the highest number from an array objects, using a selector function to get the number to compare.
 * @param array Array of objects
 * @param numberSelector The selector function to select the number to compare
 * @param takeFirst If there are multiple items with the highest number, returns the first one. Default is return the last one
 */
export function getItemWithHighestNumber<T>(
  array: T[],
  numberSelector: (item: T) => number,
  takeFirst?: boolean,
) {
  return array.reduce((prev, current) => {
    const currentNumber = numberSelector(current);
    const prevNumber = numberSelector(prev);

    return currentNumber > prevNumber
      ? current
      : currentNumber === prevNumber
        ? takeFirst
          ? prev
          : current
        : prev;
  });
}
