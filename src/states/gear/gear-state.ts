import { proxy } from "valtio";

import type { GearFilter } from "./gear-filter";
import { getEmptyGearFilter } from "./gear-filter";

export interface GearState {
  filter: GearFilter;
  resetFilter(): void;
}

export const gearState = proxy<GearState>({
  filter: getEmptyGearFilter(),
  resetFilter() {
    this.filter = getEmptyGearFilter();
  },
});

export const gearStateKey = "gears";
