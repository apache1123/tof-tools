import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { MatrixDefinitionSelectorModal } from "../../components/presentational/matrix/MatrixDefinitionSelectorModal/MatrixDefinitionSelectorModal";
import { MatrixList } from "../../components/presentational/matrix/MatrixList/MatrixList";
import { NewMatrixModal } from "../../components/presentational/matrix/NewMatrixModal/NewMatrixModal";
import { getAllMatrixDefinitions } from "../../definitions/matrices/matrix-definitions";
import type { MatrixDefinition } from "../../definitions/types/matrix/matrix-definition";
import { Matrix } from "../../models/matrix/matrix";
import { matricesState } from "../../states/states";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";

export function Matrices() {
  const { selectedCharacterState, selectedCharacterSnap } =
    useSelectedCharacter();

  const matricesSnap = useSnapshot(matricesState);

  const [isAddingMatrix, setIsAddingMatrix] = useState(false);
  const [selectedDefinition, setSelectedDefinition] = useState<
    MatrixDefinition | undefined
  >(undefined);

  return (
    selectedCharacterSnap &&
    selectedCharacterState && (
      <>
        <Stack sx={{ gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setIsAddingMatrix(true);
            }}
          >
            Add matrix
          </Button>
          <MatrixList matrices={matricesSnap.getCurrentCharacterMatrices()} />
        </Stack>

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
