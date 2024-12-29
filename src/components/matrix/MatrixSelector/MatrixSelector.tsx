import { useState } from "react";

import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import type { Matrix } from "../../../models/matrix/matrix";
import type { MatrixFilter } from "../../../models/matrix/matrix-filter";
import {
  getEmptyMatrixFilter,
  getFilteredMatrices,
} from "../../../models/matrix/matrix-filter";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { MatrixFilterSelector } from "../MatrixFilterSelector/MatrixFilterSelector";

export interface MatrixSelectorProps {
  matrices: Matrix[];
  onSelect(matrix: Matrix): void;
}

export function MatrixSelector({ matrices, onSelect }: MatrixSelectorProps) {
  const [filter, setFilter] = useState<MatrixFilter>(getEmptyMatrixFilter());

  const filteredMatrices = getFilteredMatrices(matrices, filter);

  return (
    <InventoryLayout
      filter={
        <FilterLayout
          title="Matrix Filter"
          filterContent={
            <MatrixFilterSelector filter={filter} onChange={setFilter} />
          }
          onResetFilter={() => setFilter(getEmptyMatrixFilter())}
        />
      }
      actions={undefined}
      items={filteredMatrices.map((matrix) => (
        <MatrixCard
          key={matrix.id}
          matrix={matrix}
          onClick={() => {
            onSelect(matrix);
          }}
        />
      ))}
    />
  );
}
