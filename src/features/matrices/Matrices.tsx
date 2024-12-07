import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { MatrixDefinitionSelectorModal } from "../../components/presentational/matrix/MatrixDefinitionSelectorModal/MatrixDefinitionSelectorModal";
import { MatrixFilterSelector } from "../../components/presentational/matrix/MatrixFilterSelector/MatrixFilterSelector";
import { MatrixList } from "../../components/presentational/matrix/MatrixList/MatrixList";
import { NewMatrixModal } from "../../components/presentational/matrix/NewMatrixModal/NewMatrixModal";
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

export function Matrices() {
  const { selectedCharacterId, selectedCharacterProxy } =
    useSelectedCharacter();

  const matrixRepoProxy = db.get("matrices");
  const matrixRepoSnap = useSnapshot(matrixRepoProxy);

  const { filter } = useSnapshot(matrixState) as MatrixState;

  const selectedCharacterMatrices = matrixRepoSnap.filter(
    (matrix) => matrix.characterId !== selectedCharacterId,
  );

  const filteredMatrices = getFilteredMatrices(
    selectedCharacterMatrices,
    filter,
  );

  const [isAddingMatrix, setIsAddingMatrix] = useState(false);
  const [selectedDefinition, setSelectedDefinition] = useState<
    MatrixDefinition | undefined
  >(undefined);

  return (
    selectedCharacterId &&
    selectedCharacterProxy && (
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
          items={<MatrixList matrices={filteredMatrices} />}
        />

        <MatrixDefinitionSelectorModal
          open={isAddingMatrix && !selectedDefinition}
          matrixDefinitions={getAllMatrixDefinitions()}
          title="Add matrix"
          onSelect={setSelectedDefinition}
          onCancel={() => {
            setSelectedDefinition(undefined);
            setIsAddingMatrix(false);
          }}
        />

        {selectedDefinition && (
          <NewMatrixModal
            definition={selectedDefinition}
            open={isAddingMatrix && !!selectedDefinition}
            onConfirm={({ definition, types, stars }) => {
              for (const type of types) {
                const matrix = new Matrix(
                  type,
                  definition,
                  selectedCharacterProxy,
                );
                matrix.stars = stars;
                matrixRepoProxy.add(matrix);
              }

              setSelectedDefinition(undefined);
              setIsAddingMatrix(false);
            }}
            onCancel={() => {
              setSelectedDefinition(undefined);
            }}
          />
        )}
      </>
    )
  );
}
