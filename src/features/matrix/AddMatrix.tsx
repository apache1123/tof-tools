import { useState } from "react";

import { Button } from "../../components/common/Button/Button";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { MatrixDefinitionSelector } from "../../components/matrix/MatrixDefinitionSelector/MatrixDefinitionSelector";
import { NewMatrixModal } from "../../components/matrix/NewMatrixModal/NewMatrixModal";
import { db } from "../../db/reactive-local-storage-db";
import { getAllMatrixDefinitions } from "../../definitions/matrices/matrix-definitions";
import type { MatrixDefinition } from "../../definitions/types/matrix/matrix-definition";
import type { CharacterId } from "../../models/character/character-data";
import { Matrix } from "../../models/matrix/matrix";

export interface AddMatrixProps {
  characterId: CharacterId;
  onAdded?(): void;
}

export function AddMatrix({ characterId, onAdded }: AddMatrixProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [addingDefinition, setAddingDefinition] = useState<
    MatrixDefinition | undefined
  >(undefined);

  return (
    <>
      <Button
        buttonProps={{
          variant: "contained",
        }}
        onClick={() => {
          setIsAdding(true);
        }}
      >
        Add matrix
      </Button>

      {isAdding && !addingDefinition && (
        <StyledModal
          modalContent={
            <MatrixDefinitionSelector
              matrixDefinitions={getAllMatrixDefinitions()}
              onSelect={setAddingDefinition}
            />
          }
          open={isAdding && !addingDefinition}
          modalTitle="Add matrix"
          showCancel
          onClose={() => {
            setAddingDefinition(undefined);
            setIsAdding(false);
          }}
          maxWidth={false}
          fullWidth
        />
      )}

      {isAdding && !!addingDefinition && (
        <NewMatrixModal
          definition={addingDefinition}
          open={isAdding && !!addingDefinition}
          onConfirm={({ definition, types, stars }) => {
            for (const type of types) {
              const matrix = new Matrix(type, definition, characterId);
              matrix.stars = stars;
              db.get("matrices").add(matrix);
            }

            setAddingDefinition(undefined);
            setIsAdding(false);

            onAdded?.();
          }}
          onCancel={() => {
            setAddingDefinition(undefined);
          }}
        />
      )}
    </>
  );
}
