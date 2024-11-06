/** Similar to `Object.keys()`, but will return the correct type of `Array<T>` for an object of `Record<T, U>` */
export function keysOf<T extends string, U>(
  obj: Partial<Record<T, U>>,
): Array<T> {
  return Object.keys(obj) as T[];
}
