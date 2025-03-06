import { useState } from "react";

import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { AddMatrix } from "../../../features/matrix/AddMatrix";
import type { CharacterId } from "../../../models/character/character-data";
import type { Matrix, MatrixId } from "../../../models/matrix/matrix";
import type { MatrixFilter } from "../../../models/matrix/matrix-filter";
import {
  getEmptyMatrixFilter,
  getFilteredMatrices,
} from "../../../models/matrix/matrix-filter";
import type { MatrixTypeId } from "../../../models/matrix/matrix-type";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { MatrixFilterSelector } from "../MatrixFilterSelector/MatrixFilterSelector";

export interface MatrixSelectorProps {
  characterId: CharacterId;
  matrices: Matrix[];
  /** Selecting matrix of this type */
  matrixTypeId: MatrixTypeId;
  onSelect(id: MatrixId): void;
}

export function MatrixSelector({
  characterId,
  matrices,
  matrixTypeId,
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
      actions={
        <AddMatrix
          characterId={characterId}
          onAdded={(items) => {
            // Automatically select the matrix if a newly created matrix is of the same type.
            // The add matrix component does not restrict what matrix types are added at the moment, so it is possible (but not good UX) that a matrix other than the current matrix type that's being edited is added
            const correspondingItem = items.find(
              (item) => item.typeId === matrixTypeId,
            );
            if (correspondingItem) onSelect(correspondingItem.id);
          }}
        />
      }
      items={filteredMatrices.map((matrix) => (
        <MatrixCard
          key={matrix.id}
          matrix={matrix}
          onClick={() => {
            onSelect(matrix.id);
          }}
        />
      ))}
    />
  );
}
