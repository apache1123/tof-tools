import { parseOcrInGameWordToNumber } from "../../../utils/ocr-utils";
import {
  indexOfIgnoringCase,
  splitIntoLines,
} from "../../../utils/string-utils";
import type { StatType } from "../stat-type";
import type { OcrStatResult } from "./ocr-stat-result";

export function getStatsFromAugmentScreenOcr(
  text: string,
  maxNumOfStats: number,
  possibleStatTypes: StatType[],
): OcrStatResult[] {
  const results: OcrStatResult[] = [];
  let lastMatchedStatType: StatType | undefined;

  // Sort by reverse inGameName length to ensure most specific match
  // e.g. 'Altered Attack' should be matched before 'Attack'
  const sortedPossibleStatTypes: StatType[] = possibleStatTypes.sort(
    (a, b) => b.inGameName.length - a.inGameName.length,
  );
  function matchStatType(line: string): StatType | undefined {
    // Try to match stat type that isn't in the results already
    for (const statType of sortedPossibleStatTypes.filter(
      (statType) =>
        !results.some((result) => result.statType.id === statType.id),
    )) {
      if (indexOfIgnoringCase(line, statType.inGameName) !== -1)
        return statType;
    }
  }

  const lines = splitIntoLines(text);
  // Refer to screenshot examples in example-images/gear/ocr for lines
  // Process is:
  // 1. Match stat type
  // 2. Look at succeeding lines
  // 2.a. If a line can match a stat type, this is a new stat type. End the search for a value and add the stat type without a value to result. Go back to 1.
  // 2.b. If a line can match a value, add the stat type with a value to result. Go back to 1.
  for (const line of lines) {
    // Read up to the max number of stats
    if (results.length >= maxNumOfStats) break;

    const matchedStatType = matchStatType(line);

    if (matchedStatType && !lastMatchedStatType) {
      // Stat type found. We then search the succeeding lines for a value
      lastMatchedStatType = matchedStatType;
      continue;
    }

    if (matchedStatType && lastMatchedStatType) {
      // In the process of searching for a value, but found a new stat type. End the search for a value and begin the process for a new stat type
      results.push({
        statType: lastMatchedStatType,
        value: undefined,
      });
      lastMatchedStatType = matchedStatType;
      continue;
    }

    if (!matchedStatType && !lastMatchedStatType) {
      // No stat type found and not in the process of searching for a value. Continue until we find a stat type
      continue;
    }

    if (!matchedStatType && lastMatchedStatType) {
      // In the process of searching for a value for a previously found stat type

      // Since the ocr text can be quite messy...try to remove all the spaces and non-numeric characters (except for the decimal point and %,+,- signs) and try to match a number from it
      const stringWithoutSpaces = line.replaceAll(" ", "");
      const numericWord = stringWithoutSpaces.replaceAll(/[^0-9.%+-]/g, "");

      const hasPercentage = numericWord.includes("%");

      if (hasPercentage !== lastMatchedStatType.isPercentageBased) {
        // If we matched a percentage value, but the stat type is not percentage based, this may be the stat type's percentage counterpart instead. If so, use that instead (if valid)
        // e.g. "Physical Attack" & "Physical Attack %" stat type both have the in-game text 'Physical Attack'
        // In theory this will probably not happen because the types of augment stat types are restricted to a few types, based on the random stats (e.g. Physical Attack & Physical Attack % augment stats shouldn't be possible together)
        const { inGameName } = lastMatchedStatType;
        const counterpart = possibleStatTypes.find(
          (statType) =>
            statType.inGameName === inGameName &&
            statType.isPercentageBased &&
            !results.some((result) => result.statType.id === statType.id),
        );

        if (counterpart) {
          lastMatchedStatType = counterpart;
        } else {
          // If there is no counterpart, this is not a valid value
          continue;
        }
      }

      const value = parseOcrInGameWordToNumber(numericWord);

      if (value !== undefined) {
        results.push({
          statType: lastMatchedStatType,
          value,
        });
        lastMatchedStatType = undefined;
      }
    }
  }

  // If there is still an unresolved matched stat type without a value, push the stat type without a value to result if there is space for it
  if (lastMatchedStatType && results.length < maxNumOfStats) {
    results.push({
      statType: lastMatchedStatType,
      value: undefined,
    });
  }

  return results;
}
