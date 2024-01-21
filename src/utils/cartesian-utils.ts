// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

// https://stackoverflow.com/a/15310051
export function cartesian(args) {
  const r = [],
    max = args.length - 1;
  function helper(arr, i) {
    for (let j = 0, l = args[i].length; j < l; j++) {
      const a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}
