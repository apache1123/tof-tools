import { useState } from "react";

import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import type { Matrix } from "../../../models/matrix/matrix";
import type { MatrixFilter } from "../../../models/matrix/matrix-filter";
import {
  getEmptyMatrixFilter,
  getFilteredMatrices,
} from "../../../models/matrix/matrix-filter";
import { StyledModal } from "../../common/Modal/StyledModal";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { MatrixFilterSelector } from "../MatrixFilterSelector/MatrixFilterSelector";

export interface MatrixSelectorModalProps {
  open: boolean;
  matrices: Matrix[];
  onSelect(matrix: Matrix): void;
  onClose(): void;
}

export function MatrixSelectorModal({
  open,
  matrices,
  onSelect,
  onClose,
}: MatrixSelectorModalProps) {
  const [filter, setFilter] = useState<MatrixFilter>(getEmptyMatrixFilter());

  const filteredMatrices = getFilteredMatrices(matrices, filter);

  return (
    <StyledModal
      open={open}
      modalContent={
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
                const matrix = filteredMatrices.find(
                  (matrix) => matrix.id === matrix.id,
                );
                if (matrix) onSelect(matrix);
              }}
            />
          ))}
        />
      }
      showCancel
      onClose={onClose}
      maxWidth={false}
      fullWidth
    />
  );
}
