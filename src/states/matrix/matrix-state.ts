import { proxy } from "valtio";

import type { MatrixFilter } from "./matrix-filter";

export interface MatrixState {
  filter: MatrixFilter;
  resetFilter(): void;
}

export const matrixState = proxy<MatrixState>({
  filter: getInitialFilter(),
  resetFilter() {
    this.filter = getInitialFilter();
  },
});

export const matrixStateKey = "matrices";

function getInitialFilter(): MatrixFilter {
  return {
    definitionIds: [],
  };
}
