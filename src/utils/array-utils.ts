/** Filters out `undefined` (or `null`) items from an array, with the result having the correct type.
 * When using the native array `.filter()` to achieve this, the resulting type will still be incorrectly `(x | undefined)[]`
 * https://stackoverflow.com/a/59726888
 */
export function filterOutUndefined<T>(
  array: (T | undefined)[] | ReadonlyArray<T | undefined>,
): T[] {
  return array.flatMap((x) => (x ? [x] : []));
}
