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
 * If there are multiple items with the highest number, returns the last one. */
export function getItemWithHighestNumber<T>(
  array: T[],
  numberSelector: (item: T) => number,
) {
  return array.reduce((prev, current) => {
    return numberSelector(current) >= numberSelector(prev) ? current : prev;
  });
}
