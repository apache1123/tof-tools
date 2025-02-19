import { nanoid } from "nanoid";

import type { GearSetDtoV2 } from "../../db/repositories/gear/deprecated/gear-set-dto";
import type { GearTypeId } from "../../definitions/gear-types";
import type { GearComparerStateDto } from "../../states/gear-comparer";
import type { LoadoutsStateDtoV1 } from "../../states/loadouts";

/** Data fix for potential issue with gear sets gear type data that may have been introduced in 3.0.0.
 *
 * A gear set's structure looks something like this:
 * { gearsByTypeId: { Helmet: { id: ..., type: 'Helmet', randomStats: ... }, Eyepiece: { id: ..., type: 'Eyepiece', randomStats: ... } }}
 *
 * In gear comparer's gear OCR feature, a gear's type can be overwritten, causing an issue where a gear of a different type can be in a gearsByTypeId slot of another type.
 *
 * e.g. { gearsByTypeId: { Helmet: { id: ..., type: 'Eyepiece', randomStats: ... }, Eyepiece: { id: ..., type: 'Eyepiece', randomStats: ... } }}
 *
 * Fix this by identifying the incorrect gears and resetting them to an empty gear of the correct type */
export function fixGearSetsGearTypeData() {
  const loadoutsStateJson = localStorage.getItem("loadouts");
  const gearComparerStateJson = localStorage.getItem("gearComparer");

  const loadoutsState = loadoutsStateJson
    ? (JSON.parse(loadoutsStateJson) as LoadoutsStateDtoV1)
    : undefined;
  const gearComparerState = gearComparerStateJson
    ? (JSON.parse(gearComparerStateJson) as GearComparerStateDto)
    : undefined;

  const gearSets: GearSetDtoV2[] = [];
  if (loadoutsState) {
    gearSets.push(
      ...loadoutsState.loadoutList.map(
        (loadoutItem) => loadoutItem.loadout.gearSet,
      ),
    );
  }
  if (gearComparerState) {
    gearSets.push(gearComparerState.replacementGearGearSet);
  }

  gearSets.forEach((gearSet) => {
    const gearsByTypeId = gearSet.gearsByTypeId;
    Object.keys(gearsByTypeId).forEach((gearTypeId) => {
      const gear = gearsByTypeId[gearTypeId as GearTypeId];
      if (gear?.typeId !== gearTypeId) {
        gearsByTypeId[gearTypeId as GearTypeId] = {
          id: nanoid(),
          typeId: gearTypeId as GearTypeId,
          stars: 0,
          randomStats: [undefined, undefined, undefined, undefined],
          augmentStats: [],
          isAugmented: false,
          version: 1,
        };
      }
    });
  });

  if (loadoutsState) {
    localStorage.setItem("loadouts", JSON.stringify(loadoutsState));
  }
  if (gearComparerState) {
    localStorage.setItem("gearComparer", JSON.stringify(gearComparerState));
  }
}
