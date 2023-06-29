import BigNumber from 'bignumber.js';

import { gearTypes } from '../../configs/gear-types';
import { statTypes } from '../../configs/stat-types';
import {
  Gear,
  newEmptyGear,
  setGearRandomStatType,
  setGearRandomStatValue,
  setGearType,
} from '../models/gear';
import { GearType } from '../models/gear-type';
import { StatType } from '../models/stat-type';
import {
  containsString,
  indexOfIgnoringCase,
  splitIntoWords,
} from '../utils/string-utils';

export interface GearOCRService {
  getGearFromOCR(text: string): Gear;
}

const goldGearNamePrefix = 'Fortress';
const randomStatsSectionTitle = 'Random Stats';

export const gearOCRService: GearOCRService = {
  getGearFromOCR(text: string) {
    const gear = newEmptyGear();

    const lines = text.split(/\r?\n/g);

    let hasFoundGearType = false;
    let foundGearType: GearType;

    let hasFoundRandomStatsSection = false;
    let numOfRandomStatsToFind: number;
    let numOfRandomStatsFound = 0;
    let randomStatTypes: StatType[];

    lines.forEach((line) => {
      if (!hasFoundGearType && containsString(line, goldGearNamePrefix)) {
        const sortedGearTypes = gearTypes.allIds
          .map((id) => gearTypes.byId[id])
          // Sort by inGameName length to aid OCR
          // e.g. 'Super eyepiece' should be matched after 'Eyepiece' to overwrite the 'Eyepiece' match
          .sort((a, b) => a.inGameName.length - b.inGameName.length);

        for (const gearType of sortedGearTypes) {
          if (containsString(line, gearType.inGameName)) {
            setGearType(gear, gearType);
            hasFoundGearType = true;
            foundGearType = gearType;
          }
        }

        return;
      }

      // If found the random stats section, read up to the max number of random stats of the gear type, if available.
      // If the gear type is not available, read until the end of all the lines (for now, this may need to change in the future)
      if (
        !hasFoundRandomStatsSection &&
        containsString(line, randomStatsSectionTitle)
      ) {
        hasFoundRandomStatsSection = true;

        if (foundGearType) {
          numOfRandomStatsToFind = foundGearType.numberOfRandomStats;
        }

        // Pre-load random stat types for subsequent lines
        randomStatTypes = statTypes.allIds
          .map((id) => statTypes.byId[id])
          // Sort by inGameName length to aid OCR
          // e.g. 'Altered Attack' should be matched after 'Attack' to overwrite the 'Attack' match
          .sort((a, b) => a.inGameName.length - b.inGameName.length);
        return;
      }

      if (
        hasFoundRandomStatsSection &&
        (numOfRandomStatsToFind || numOfRandomStatsToFind === undefined)
      ) {
        let hasMatch = false;

        // Try to match ALL the random stat types since we can match 'Attack' then match 'Altered Attack' for example
        // The last match should be the correct one
        for (const randomStatType of randomStatTypes) {
          const indexOfRandomStatName = indexOfIgnoringCase(
            line,
            randomStatType.inGameName
          );

          if (indexOfRandomStatName === -1) continue;

          // Matched random stat name, assume the word after the name is the value and try to match it
          const stringAfterRandomStatName = line.slice(
            indexOfRandomStatName + randomStatType.inGameName.length
          );
          const firstWordAfterRandomStatName = splitIntoWords(
            stringAfterRandomStatName
          )[0];

          if (!firstWordAfterRandomStatName) continue;

          const hasPercentage = firstWordAfterRandomStatName.includes('%');

          // e.g. 'Physical Resistance +7.87%' has to be matched to 'Physical Resistance %', not 'Physical Resistance'
          if (hasPercentage !== !!randomStatType.isPercentageBased) continue;

          // Percentage values are in the format '+7.8%' (string)
          // Non-percentage values are in the format '+4,125'
          // Assume the in-game locale is always ',' thousand separator and '.' decimal separator
          const value = hasPercentage
            ? BigNumber(
                firstWordAfterRandomStatName.replace('%', '').replace(',', '')
              )
                .dividedBy(100)
                .toNumber()
            : +firstWordAfterRandomStatName.replace(',', '');

          if (Number.isNaN(value)) continue;

          setGearRandomStatType(gear, numOfRandomStatsFound, randomStatType);
          setGearRandomStatValue(gear, numOfRandomStatsFound, value);
          hasMatch = true;
        }

        if (hasMatch) {
          numOfRandomStatsFound++;
        }
      }
    });

    return gear;
  },
};
