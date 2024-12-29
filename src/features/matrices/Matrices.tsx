import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { MatrixCard } from "../../components/matrix/MatrixCard/MatrixCard";
import { MatrixDefinitionSelector } from "../../components/matrix/MatrixDefinitionSelector/MatrixDefinitionSelector";
import { MatrixFilterSelector } from "../../components/matrix/MatrixFilterSelector/MatrixFilterSelector";
import { NewMatrixModal } from "../../components/matrix/NewMatrixModal/NewMatrixModal";
import { db } from "../../db/reactive-local-storage-db";
import { getAllMatrixDefinitions } from "../../definitions/matrices/matrix-definitions";
import type { MatrixDefinition } from "../../definitions/types/matrix/matrix-definition";
import { Matrix } from "../../models/matrix/matrix";
import { getFilteredMatrices } from "../../models/matrix/matrix-filter";
import type { MatrixState } from "../../states/matrix/matrix-state";
import { matrixState } from "../../states/matrix/matrix-state";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { FilterLayout } from "../common/FilterLayout";
import { InventoryLayout } from "../common/InventoryLayout";
import { MatrixEditor } from "./MatrixEditor";
import { useMatrices } from "./useMatrices";

export function Matrices() {
  const { selectedCharacterId } = useSelectedCharacter();

  const matrixRepoProxy = db.get("matrices");

  const { matrixSnaps } = useMatrices(selectedCharacterId);

  const { filter } = useSnapshot(matrixState) as MatrixState;
  const filteredMatrices = getFilteredMatrices(matrixSnaps, filter);

  const [isAddingMatrix, setIsAddingMatrix] = useState(false);
  const [addingDefinition, setAddingDefinition] = useState<
    MatrixDefinition | undefined
  >(undefined);

  const [editingMatrix, setEditingMatrix] = useState<Matrix | undefined>(
    undefined,
  );

  return (
    selectedCharacterId && (
      <>
        <InventoryLayout
          filter={
            <FilterLayout
              title="Matrix Filter"
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
          actions={
            <Button
              variant="contained"
              onClick={() => {
                setIsAddingMatrix(true);
              }}
            >
              Add matrix
            </Button>
          }
          items={filteredMatrices.map((matrix) => (
            <MatrixCard
              key={matrix.id}
              matrix={matrix}
              onClick={() => {
                const matrixProxy = matrixRepoProxy.find(matrix.id);
                if (matrixProxy) setEditingMatrix(matrixProxy);
              }}
            />
          ))}
        />

        <StyledModal
          modalContent={
            <MatrixDefinitionSelector
              matrixDefinitions={getAllMatrixDefinitions()}
              onSelect={setAddingDefinition}
            />
          }
          open={isAddingMatrix && !addingDefinition}
          modalTitle="Add matrix"
          showCancel
          onClose={() => {
            setAddingDefinition(undefined);
            setIsAddingMatrix(false);
          }}
          maxWidth={false}
          fullWidth
        />

        {addingDefinition && (
          <NewMatrixModal
            definition={addingDefinition}
            open={isAddingMatrix && !!addingDefinition}
            onConfirm={({ definition, types, stars }) => {
              for (const type of types) {
                const matrix = new Matrix(
                  type,
                  definition,
                  selectedCharacterId,
                );
                matrix.stars = stars;
                matrixRepoProxy.add(matrix);
              }

              setAddingDefinition(undefined);
              setIsAddingMatrix(false);
            }}
            onCancel={() => {
              setAddingDefinition(undefined);
            }}
          />
        )}

        {editingMatrix && (
          <EditorModal
            modalContent={<MatrixEditor matrixProxy={editingMatrix} />}
            open={!!editingMatrix}
            itemName={editingMatrix.displayName}
            onClose={() => {
              setEditingMatrix(undefined);
            }}
            showDelete
            onDelete={() => {
              matrixRepoProxy.remove(editingMatrix.id);
              setEditingMatrix(undefined);
            }}
            fullWidth
          />
        )}
      </>
    )
  );
}
