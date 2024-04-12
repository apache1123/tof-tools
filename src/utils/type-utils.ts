/** Type util for pulling out only public members of a class to use as an interface for convenience. This is useful for *implementing* a class, using it as an interface, without typescript complaining about missing private fields.
 * https://github.com/Microsoft/TypeScript/issues/18499
 */
export type Public<T> = { [K in keyof T]: T[K] };
