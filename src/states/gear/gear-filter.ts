import type { GearTypeId } from "../../definitions/gear-types";
import type { Gear } from "../../models/gear/gear";

export interface GearFilter {
  gearTypeIds: GearTypeId[];
}

export function getEmptyGearFilter(): GearFilter {
  return {
    gearTypeIds: [],
  };
}

export function getFilteredGears(gears: Gear[], filter: GearFilter) {
  return gears.filter((gear) => {
    const { gearTypeIds } = filter;
    if (gearTypeIds.length) {
      return gearTypeIds.includes(gear.type.id);
    }

    return true;
  });
}
