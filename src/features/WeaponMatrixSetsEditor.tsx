import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import {
  MatrixSet2pcDefinitionSelector,
  MatrixSet4pcDefinitionSelector,
} from '../components/MatrixSetDefinitionSelector/MatrixSetDefinitionSelector';
import { MatrixSetPiecesSelector } from '../components/MatrixSetPiecesSelector/MatrixSetPiecesSelector';
import { MatrixStarsSelector } from '../components/MatrixStarsSelector/MatrixStarsSelector';
import {
  getDefinition,
  newMatrixSet,
  setDefinition,
  setStars,
} from '../models/matrix-set';
import type { MatrixSet2pcName } from '../models/matrix-set-definition';
import {
  getMatrixSet2pcTo4pcName,
  getMatrixSetDefinition,
  type MatrixSetPieces,
} from '../models/matrix-set-definition';
import type { WeaponMatrixSets } from '../models/weapon-matrix-sets';
import {
  clearMatrixSet2pc1,
  clearMatrixSet2pc2,
  clearMatrixSet4pc,
  setMatrixSet2pc1,
  setMatrixSet2pc2,
  setMatrixSet4pc,
} from '../models/weapon-matrix-sets';

export interface WeaponMatrixSetsEditorProps {
  weaponMatrixSetsState: WeaponMatrixSets;
}

export function WeaponMatrixSetsEditor({
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
  } = useSnapshot(weaponMatrixSetsState);

  const matrixSetPieces: MatrixSetPieces = matrixSet4pcSnap
    ? 4
    : matrixSet2pc1Snap || matrixSet2pc2Snap
    ? 2
    : defaultMatrixSetPieces;

  const matrixSet4pcDefinition = matrixSet4pcSnap
    ? getDefinition(matrixSet4pcSnap)
    : undefined;
  const matrixSet2pc1Definition = matrixSet2pc1Snap
    ? getDefinition(matrixSet2pc1Snap)
    : undefined;
  const matrixSet2pc2Definition = matrixSet2pc2Snap
    ? getDefinition(matrixSet2pc2Snap)
    : undefined;

  return (
    <Stack spacing={1} alignItems="center">
      <MatrixSetPiecesSelector
        matrixSetPieces={matrixSetPieces}
        onChange={(pieces) => {
          setDefaultMatrixSetPieces(pieces);
          clearMatrixSet4pc(weaponMatrixSetsState);
          clearMatrixSet2pc1(weaponMatrixSetsState);
          clearMatrixSet2pc2(weaponMatrixSetsState);
        }}
      />

      {matrixSetPieces === 2 && (
        <Box sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MatrixSet2pcDefinitionSelector
              selectedMatrixSetDefinition={matrixSet2pc1Definition}
              onChange={(definition) => {
                if (
                  definition &&
                  definition.id === matrixSet2pc2Definition?.id
                ) {
                  const counterpart4pcName = getMatrixSet2pcTo4pcName(
                    definition.id as MatrixSet2pcName
                  );
                  const counterpart4pcDefinition =
                    getMatrixSetDefinition(counterpart4pcName);

                  if (matrixSet4pcState) {
                    setDefinition(matrixSet4pcState, counterpart4pcDefinition);
                  } else {
                    setMatrixSet4pc(
                      weaponMatrixSetsState,
                      newMatrixSet(counterpart4pcDefinition)
                    );
                  }

                  clearMatrixSet2pc1(weaponMatrixSetsState);
                  clearMatrixSet2pc2(weaponMatrixSetsState);
                  return;
                }

                if (definition) {
                  if (matrixSet2pc1State) {
                    setDefinition(matrixSet2pc1State, definition);
                  } else {
                    setMatrixSet2pc1(
                      weaponMatrixSetsState,
                      newMatrixSet(definition)
                    );
                  }
                } else {
                  clearMatrixSet2pc1(weaponMatrixSetsState);
                }
              }}
            />
            {matrixSet2pc1Snap && matrixSet2pc1State ? (
              <MatrixStarsSelector
                stars={matrixSet2pc1Snap.stars}
                onStarsChange={(stars) => {
                  setStars(matrixSet2pc1State, stars);
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
                if (
                  definition &&
                  definition.id === matrixSet2pc1Definition?.id
                ) {
                  const counterpart4pcName = getMatrixSet2pcTo4pcName(
                    definition.id as MatrixSet2pcName
                  );
                  const counterpart4pcDefinition =
                    getMatrixSetDefinition(counterpart4pcName);

                  if (matrixSet4pcState) {
                    setDefinition(matrixSet4pcState, counterpart4pcDefinition);
                  } else {
                    setMatrixSet4pc(
                      weaponMatrixSetsState,
                      newMatrixSet(counterpart4pcDefinition)
                    );
                  }

                  clearMatrixSet2pc1(weaponMatrixSetsState);
                  clearMatrixSet2pc2(weaponMatrixSetsState);
                  return;
                }

                if (definition) {
                  if (matrixSet2pc2State) {
                    setDefinition(matrixSet2pc2State, definition);
                  } else {
                    setMatrixSet2pc2(
                      weaponMatrixSetsState,
                      newMatrixSet(definition)
                    );
                  }
                } else {
                  clearMatrixSet2pc2(weaponMatrixSetsState);
                }
              }}
            />
            {matrixSet2pc2Snap && matrixSet2pc2State ? (
              <MatrixStarsSelector
                stars={matrixSet2pc2Snap.stars}
                onStarsChange={(stars) => {
                  setStars(matrixSet2pc2State, stars);
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
          sx={{ width: '100%' }}
        >
          <MatrixSet4pcDefinitionSelector
            selectedMatrixSetDefinition={matrixSet4pcDefinition}
            onChange={(definition) => {
              if (definition) {
                if (matrixSet4pcState) {
                  setDefinition(matrixSet4pcState, definition);
                } else {
                  setMatrixSet4pc(
                    weaponMatrixSetsState,
                    newMatrixSet(definition)
                  );
                }
              } else {
                clearMatrixSet4pc(weaponMatrixSetsState);
              }
            }}
          />
          {matrixSet4pcSnap && matrixSet4pcState ? (
            <MatrixStarsSelector
              stars={matrixSet4pcSnap.stars}
              onStarsChange={(stars) => {
                setStars(matrixSet4pcState, stars);
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
