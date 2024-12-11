import { proxy } from "valtio";

import type { GearFilter } from "./gear-filter";

export interface GearState {
  filter: GearFilter;
  resetFilter(): void;
}

export const gearState = proxy<GearState>({
  filter: getInitialFilter(),
  resetFilter() {
    this.filter = getInitialFilter();
  },
});

export const gearStateKey = "gears";

function getInitialFilter(): GearFilter {
  return {
    gearTypeIds: [],
  };
}
