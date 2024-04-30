import path from 'path';

/** Splits a file path string into an array of parts
 * @example splitFilePath('simulator-results/rei/rei0-brevey6-nanyin0.json')
 * // ["simulator-results", "rei", "rei0-brevey6-nanyin0.json"]
 */
export function splitFilePath(filePath: string) {
  // Split the path using the path separator (either '/' or '\')
  return path
    .parse(filePath)
    .dir.split(path.sep)
    .concat(path.basename(filePath));
}
