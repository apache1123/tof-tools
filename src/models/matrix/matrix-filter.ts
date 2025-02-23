import type { MatrixDefinitionId } from "../../definitions/matrices/matrix-definitions";
import type { Matrix } from "./matrix";

export interface MatrixFilter {
  definitionIds: MatrixDefinitionId[];
}

export function getEmptyMatrixFilter(): MatrixFilter {
  return {
    definitionIds: [],
  };
}

export function getFilteredMatrices(matrices: Matrix[], filter: MatrixFilter) {
  return matrices.filter((matrix) => {
    const { definitionIds } = filter;
    if (definitionIds.length) {
      return definitionIds.includes(matrix.definitionId);
    }

    return true;
  });
}
