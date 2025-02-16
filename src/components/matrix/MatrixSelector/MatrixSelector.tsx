import { useState } from "react";

import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { AddMatrix } from "../../../features/matrix/AddMatrix";
import type { CharacterId } from "../../../models/character/character-data";
import type { Matrix } from "../../../models/matrix/matrix";
import type { MatrixFilter } from "../../../models/matrix/matrix-filter";
import {
  getEmptyMatrixFilter,
  getFilteredMatrices,
} from "../../../models/matrix/matrix-filter";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { MatrixFilterSelector } from "../MatrixFilterSelector/MatrixFilterSelector";

export interface MatrixSelectorProps {
  characterId: CharacterId;
  matrices: Matrix[];
  onSelect(matrix: Matrix): void;
}

export function MatrixSelector({
  characterId,
  matrices,
  onSelect,
}: MatrixSelectorProps) {
  const [filter, setFilter] = useState<MatrixFilter>(getEmptyMatrixFilter());

  const filteredMatrices = getFilteredMatrices(matrices, filter);

  return (
    <InventoryLayout
      filter={
        <FilterLayout
          filterContent={
            <MatrixFilterSelector filter={filter} onChange={setFilter} />
          }
          onResetFilter={() => setFilter(getEmptyMatrixFilter())}
        />
      }
      actions={<AddMatrix characterId={characterId} />}
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
