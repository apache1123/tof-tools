// Prior to app v4/commit d116b53, it was possible for gear OCR to read augment stats and add them as random stats, bypassing the maximum number of random stats a gear can have. Some users used this as a way to add their augment stats as at that time it was not possible to add augment stats.
// During the v4 rewrite, however, when setting a gear's random stat, the random stat's index is checked against the max number of random stats a gear can have (4), resulting in an error being thrown. Plus these extra random stats should be augment stats, not random stats.
// Fix this data error by identifying gear with more random stats than they should have, then add them as augment stats instead. This should be fine since random stats and augment stats share the same structure. One caveat with this is that the augment stat type will not be checked like it is in the app right now, so it is possible for a not-possible augment stat type to be there, but that is what the user inputted so... not so much of a problem anyway
// There should only be a tiny amount of users affected
import { repositoryKeyPrefix } from "../../constants/persistence";
import type { GearDto } from "../../db/repositories/gear/dtos/gear-dto";
import {
  maxNumOfAugmentStats,
  maxNumOfRandomStats,
} from "../../definitions/gear";

export function fixOutOfRangeGearRandomStats() {
  const gearRepoKey = `${repositoryKeyPrefix}gears`;
  const gearsJson = localStorage.getItem(gearRepoKey);
  const gears = gearsJson ? (JSON.parse(gearsJson) as GearDto[]) : undefined;

  if (!gears) return;

  let hasDataFixes = false;

  gears.forEach((gear) => {
    while (gear.randomStats.length > maxNumOfRandomStats) {
      const outOfRangeIndex = maxNumOfRandomStats;
      const outOfRangeRandomStat = gear.randomStats[outOfRangeIndex];

      if (outOfRangeRandomStat) {
        // Move stat from random stats to augment stats, providing there is space. If there is no space in the augment stats, it will simply be deleted. Either way, the original stat will be removed from the random stats.
        if (!gear.augmentStats) {
          gear.augmentStats = [outOfRangeRandomStat];
        } else if (gear.augmentStats.length < maxNumOfAugmentStats) {
          gear.augmentStats.push(outOfRangeRandomStat);
        }

        gear.randomStats.splice(outOfRangeIndex, 1);
      } else {
        // Is empty random stat slot (undefined value), still remove the undefined
        gear.randomStats.splice(outOfRangeIndex, 1);
      }

      hasDataFixes = true;
    }
  });

  if (hasDataFixes) {
    localStorage.setItem(gearRepoKey, JSON.stringify(gears));
  }
}
