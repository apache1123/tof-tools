import { parseOcrInGameWordToNumber } from "../../../utils/ocr-utils";
import {
  indexOfIgnoringCase,
  splitIntoLines,
  splitIntoWords,
} from "../../../utils/string-utils";
import type { StatType } from "../stat-type";
import type { OcrStatResult } from "./ocr-stat-result";

export function getStatsFromGearCardOcr(
  text: string,
  maxNumOfStats: number,
  possibleStatTypes: StatType[],
): OcrStatResult[] {
  const lines = splitIntoLines(text);

  const results: OcrStatResult[] = [];

  // Sort by inGameName length to aid OCR
  // e.g. 'Altered Attack' should be matched after 'Attack' to overwrite the 'Attack' match
  const sortedPossibleStatTypes: StatType[] = possibleStatTypes.sort(
    (a, b) => a.inGameName.length - b.inGameName.length,
  );

  lines.forEach((line) => {
    // Read up to the max number of stats, if available.
    if (maxNumOfStats > results.length) {
      let matchedResult: OcrStatResult | undefined;

      // Try to match ALL stat types (that isn't in the results already) since we can match 'Attack' then match 'Altered Attack' for example
      // The last match should be the correct one
      for (const statType of sortedPossibleStatTypes.filter(
        (statType) =>
          !results.some((result) => result.statType.id === statType.id),
      )) {
        const indexOfStatName = indexOfIgnoringCase(line, statType.inGameName);

        if (indexOfStatName === -1) continue;

        // Matched stat name, assume the word after the name is the value and try to match it
        const stringAfterStatName = line.slice(
          indexOfStatName + statType.inGameName.length,
        );
        const firstWordAfterStatName = splitIntoWords(stringAfterStatName)[0];

        if (!firstWordAfterStatName) continue;

        const hasPercentage = firstWordAfterStatName.includes("%");

        // e.g. 'Physical Resistance +7.87%' has to be matched to 'Physical Resistance %', not 'Physical Resistance'
        if (hasPercentage !== statType.isPercentageBased) continue;

        const value = parseOcrInGameWordToNumber(firstWordAfterStatName);

        if (value === undefined) continue;

        matchedResult = { statType, value };
      }

      if (matchedResult) {
        results.push(matchedResult);
      }
    }
  });

  return results;
}
