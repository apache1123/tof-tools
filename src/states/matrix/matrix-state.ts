import { proxy } from "valtio";

import type { MatrixFilter } from "../../models/matrix/matrix-filter";
import { getEmptyMatrixFilter } from "../../models/matrix/matrix-filter";

export interface MatrixState {
  filter: MatrixFilter;
  resetFilter(): void;
}

export const matrixState = proxy<MatrixState>({
  filter: getEmptyMatrixFilter(),
  resetFilter() {
    this.filter = getEmptyMatrixFilter();
  },
});

export const matrixStateKey = "matrices";
