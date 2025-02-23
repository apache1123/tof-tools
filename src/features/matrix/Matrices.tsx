import { useState } from "react";
import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { MatrixCard } from "../../components/matrix/MatrixCard/MatrixCard";
import { MatrixFilterSelector } from "../../components/matrix/MatrixFilterSelector/MatrixFilterSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { Matrix } from "../../models/matrix/matrix";
import { getFilteredMatrices } from "../../models/matrix/matrix-filter";
import type { MatrixState } from "../../states/matrix/matrix-state";
import { matrixState } from "../../states/matrix/matrix-state";
import { FilterLayout } from "../common/FilterLayout";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { AddMatrix } from "./AddMatrix";
import { EditMatrix } from "./EditMatrix";

export interface MatricesProps {
  characterId: CharacterId;
}

export function Matrices({ characterId }: MatricesProps) {
  const matrixRepo = db.get("matrices");

  const { items } = useItemsBelongingToCharacter(matrixRepo, characterId);

  const { filter } = useSnapshot(matrixState) as MatrixState;
  const filteredItems = getFilteredMatrices(items, filter);

  const [editingMatrix, setEditingMatrix] = useState<Matrix | undefined>(
    undefined,
  );

  return (
    <>
      <InventoryLayout
        filter={
          <FilterLayout
            filterContent={
              <MatrixFilterSelector
                filter={filter}
                onChange={(filter) => {
                  matrixState.filter = filter;
                }}
              />
            }
            onResetFilter={() => {
              matrixState.resetFilter();
            }}
          />
        }
        actions={<AddMatrix characterId={characterId} />}
        items={filteredItems.map((matrix) => (
          <MatrixCard
            key={matrix.id}
            matrix={matrix}
            onClick={() => {
              const matrixProxy = matrixRepo.find(matrix.id);
              if (matrixProxy) setEditingMatrix(matrixProxy);
            }}
          />
        ))}
      />

      {editingMatrix && (
        <EditorModal
          modalContent={<EditMatrix matrixProxy={editingMatrix} />}
          modalTitle="Edit matrix"
          open={!!editingMatrix}
          itemName={editingMatrix.displayName}
          onClose={() => {
            setEditingMatrix(undefined);
          }}
          showDelete
          onDelete={() => {
            matrixRepo.remove(editingMatrix.id);
            setEditingMatrix(undefined);
          }}
          fullWidth
        />
      )}
    </>
  );
}
