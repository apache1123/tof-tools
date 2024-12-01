import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { MatrixDefinitionSelectorModal } from "../../components/presentational/matrix/MatrixDefinitionSelectorModal/MatrixDefinitionSelectorModal";
import { MatrixFilter } from "../../components/presentational/matrix/MatrixFilter/MatrixFilter";
import { MatrixList } from "../../components/presentational/matrix/MatrixList/MatrixList";
import { NewMatrixModal } from "../../components/presentational/matrix/NewMatrixModal/NewMatrixModal";
import { getAllMatrixDefinitions } from "../../definitions/matrices/matrix-definitions";
import type { MatrixDefinition } from "../../definitions/types/matrix/matrix-definition";
import { Matrix } from "../../models/matrix/matrix";
import type { MatricesState } from "../../states/matrices/matrices-state";
import { matricesState } from "../../states/states";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { FilterLayout } from "../common/FilterLayout";
import { InventoryLayout } from "../common/InventoryLayout";

export function Matrices() {
  const { selectedCharacterState, selectedCharacterSnap } =
    useSelectedCharacter();

  const matricesSnap = useSnapshot(matricesState) as MatricesState;
  const { filter } = matricesSnap;

  const [isAddingMatrix, setIsAddingMatrix] = useState(false);
  const [selectedDefinition, setSelectedDefinition] = useState<
    MatrixDefinition | undefined
  >(undefined);

  return (
    selectedCharacterSnap &&
    selectedCharacterState && (
      <>
        <InventoryLayout
          filter={
            <FilterLayout
              title="Matrix Filter"
              filterContent={
                <MatrixFilter
                  filter={filter}
                  onChange={(filter) => {
                    matricesState.filter = filter;
                  }}
                />
              }
              onResetFilter={() => {
                matricesState.resetFilter();
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
          items={<MatrixList matrices={matricesSnap.getFilteredMatrices()} />}
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
                  selectedCharacterState.id,
                );
                matrix.stars = stars;
                matricesState.add(matrix);
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
