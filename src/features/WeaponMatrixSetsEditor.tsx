import { Box, Stack } from "@mui/material";
import { useState } from "react";

import {
  MatrixSet2pcDefinitionSelector,
  MatrixSet4pcDefinitionSelector,
} from "../components/MatrixSetDefinitionSelector/MatrixSetDefinitionSelector";
import { MatrixSetPiecesSelector } from "../components/MatrixSetPiecesSelector/MatrixSetPiecesSelector";
import { MatrixStarsSelector } from "../components/MatrixStarsSelector/MatrixStarsSelector";
import { MatrixSet } from "../models/matrix-set";
import { type MatrixSetPieces } from "../models/matrix-set-definition";
import type { WeaponMatrixSets } from "../models/weapon-matrix-sets";

export interface WeaponMatrixSetsEditorProps {
  weaponMatrixSetsSnap: WeaponMatrixSets;
  weaponMatrixSetsState: WeaponMatrixSets;
}

export function WeaponMatrixSetsEditor({
  weaponMatrixSetsSnap,
  weaponMatrixSetsState,
}: WeaponMatrixSetsEditorProps) {
  const [defaultMatrixSetPieces, setDefaultMatrixSetPieces] =
    useState<MatrixSetPieces>(2);

  const {
    matrixSet4pc: matrixSet4pcState,
    matrixSet2pc1: matrixSet2pc1State,
    matrixSet2pc2: matrixSet2pc2State,
  } = weaponMatrixSetsState;
  const {
    matrixSet4pc: matrixSet4pcSnap,
    matrixSet2pc1: matrixSet2pc1Snap,
    matrixSet2pc2: matrixSet2pc2Snap,
  } = weaponMatrixSetsSnap;

  const matrixSetPieces: MatrixSetPieces = matrixSet4pcSnap
    ? 4
    : matrixSet2pc1Snap || matrixSet2pc2Snap
      ? 2
      : defaultMatrixSetPieces;

  const matrixSet4pcDefinition = matrixSet4pcSnap?.definition;
  const matrixSet2pc1Definition = matrixSet2pc1Snap?.definition;
  const matrixSet2pc2Definition = matrixSet2pc2Snap?.definition;

  return (
    <Stack spacing={1} alignItems="center">
      <MatrixSetPiecesSelector
        matrixSetPieces={matrixSetPieces}
        onChange={(pieces) => {
          setDefaultMatrixSetPieces(pieces);
          weaponMatrixSetsState.matrixSet4pc = undefined;
          weaponMatrixSetsState.matrixSet2pc1 = undefined;
          weaponMatrixSetsState.matrixSet2pc2 = undefined;
        }}
      />

      {matrixSetPieces === 2 && (
        <Box sx={{ width: "100%" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MatrixSet2pcDefinitionSelector
              selectedMatrixSetDefinition={matrixSet2pc1Definition}
              onChange={(definition) => {
                if (definition) {
                  if (matrixSet2pc1State) {
                    matrixSet2pc1State.definition = definition;
                  } else {
                    weaponMatrixSetsState.matrixSet2pc1 = new MatrixSet(
                      definition,
                    );
                  }
                } else {
                  weaponMatrixSetsState.matrixSet2pc1 = undefined;
                }
              }}
            />
            {matrixSet2pc1Snap && matrixSet2pc1State ? (
              <MatrixStarsSelector
                stars={matrixSet2pc1Snap.stars}
                onStarsChange={(stars) => {
                  matrixSet2pc1State.stars = stars;
                  weaponMatrixSetsState.combine2pcInto4pcIfPossible();
                }}
              />
            ) : (
              <MatrixStarsSelector stars={0} disabled />
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MatrixSet2pcDefinitionSelector
              selectedMatrixSetDefinition={matrixSet2pc2Definition}
              onChange={(definition) => {
                if (definition) {
                  if (matrixSet2pc2State) {
                    matrixSet2pc2State.definition = definition;
                  } else {
                    weaponMatrixSetsState.matrixSet2pc2 = new MatrixSet(
                      definition,
                    );
                  }
                } else {
                  weaponMatrixSetsState.matrixSet2pc2 = undefined;
                }
              }}
            />
            {matrixSet2pc2Snap && matrixSet2pc2State ? (
              <MatrixStarsSelector
                stars={matrixSet2pc2Snap.stars}
                onStarsChange={(stars) => {
                  matrixSet2pc2State.stars = stars;
                  weaponMatrixSetsState.combine2pcInto4pcIfPossible();
                }}
              />
            ) : (
              <MatrixStarsSelector stars={0} disabled />
            )}
          </Stack>
        </Box>
      )}

      {matrixSetPieces === 4 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <MatrixSet4pcDefinitionSelector
            selectedMatrixSetDefinition={matrixSet4pcDefinition}
            onChange={(definition) => {
              if (definition) {
                if (matrixSet4pcState) {
                  matrixSet4pcState.definition = definition;
                } else {
                  weaponMatrixSetsState.matrixSet4pc = new MatrixSet(
                    definition,
                  );
                }
              } else {
                weaponMatrixSetsState.matrixSet4pc = undefined;
              }
            }}
          />
          {matrixSet4pcSnap && matrixSet4pcState ? (
            <MatrixStarsSelector
              stars={matrixSet4pcSnap.stars}
              onStarsChange={(stars) => {
                matrixSet4pcState.stars = stars;
              }}
            />
          ) : (
            <MatrixStarsSelector stars={0} disabled />
          )}
        </Stack>
      )}
    </Stack>
  );
}
