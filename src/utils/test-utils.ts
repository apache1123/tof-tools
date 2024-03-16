/** Repeatedly executes a function many times */
export function repeat(fn: () => unknown, times: number) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}
