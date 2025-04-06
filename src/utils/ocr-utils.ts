import BigNumber from "bignumber.js";

/** Try to parse an in-game word retrieved from OCR to a number.
 * Returns undefined if the word cannot be parsed.
 *
 * Percentage values are in the format '+7.8%' (string)
 * Non-percentage values are in the format '+4,125'
 * Assume the in-game locale is always ',' thousand separator and '.' decimal separator */
export function parseOcrInGameWordToNumber(word: string): number | undefined {
  // Empty string parses a bit weird (+"" = 0), so early return undefined
  if (word.length === 0) return undefined;

  const hasPercentage = word.includes("%");

  const value = hasPercentage
    ? BigNumber(word.replace("%", "").replace(",", ""))
        .dividedBy(100)
        .toNumber()
    : +word.replace(",", "");

  return Number.isNaN(value) ? undefined : value;
}
