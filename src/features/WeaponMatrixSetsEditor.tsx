import { Stack } from '@mui/material';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { MatrixSetDefinitionSelector } from '../components/MatrixSetDefinitionSelector/MatrixSetDefinitionSelector';
import { MatrixSetPiecesSelector } from '../components/MatrixSetPiecesSelector/MatrixSetPiecesSelector';
import { MatrixStarsSelector } from '../components/MatrixStarsSelector/MatrixStarsSelector';
import {
  matrixSet2pcDefinitions,
  matrixSet4pcDefinitions,
} from '../constants/matrix-set-definitions';
import {
  getDefinition,
  newMatrixSet,
  setDefinition,
  setStars,
} from '../models/matrix-set';
import type { MatrixSetPieces } from '../models/matrix-set-definition';
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

const options2pc = matrixSet2pcDefinitions.allIds.map(
  (id) => matrixSet2pcDefinitions.byId[id]
);
const options4pc = matrixSet4pcDefinitions.allIds.map(
  (id) => matrixSet4pcDefinitions.byId[id]
);

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
    <Stack spacing={2}>
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
        <Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MatrixSetDefinitionSelector
              options={options2pc}
              selectedMatrixSetDefinition={matrixSet2pc1Definition}
              onChange={(definition) => {
                if (
                  definition &&
                  definition.id === matrixSet2pc2Definition?.id
                ) {
                  const corresponding4pcDefinition =
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    matrixSet4pcDefinitions.byId[
                      definition.id.replace('2pc', '4pc')
                    ];

                  if (matrixSet4pcState) {
                    setDefinition(
                      matrixSet4pcState,
                      corresponding4pcDefinition
                    );
                  } else {
                    setMatrixSet4pc(
                      weaponMatrixSetsState,
                      newMatrixSet(corresponding4pcDefinition)
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
            {matrixSet2pc1Snap && matrixSet2pc1State && (
              <MatrixStarsSelector
                stars={matrixSet2pc1Snap.stars}
                onStarsChange={(stars) => {
                  setStars(matrixSet2pc1State, stars);
                }}
              />
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MatrixSetDefinitionSelector
              options={options2pc}
              selectedMatrixSetDefinition={matrixSet2pc2Definition}
              onChange={(definition) => {
                if (
                  definition &&
                  definition.id === matrixSet2pc1Definition?.id
                ) {
                  const corresponding4pcDefinition =
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    matrixSet4pcDefinitions.byId[
                      definition.id.replace('2pc', '4pc')
                    ];

                  if (matrixSet4pcState) {
                    setDefinition(
                      matrixSet4pcState,
                      corresponding4pcDefinition
                    );
                  } else {
                    setMatrixSet4pc(
                      weaponMatrixSetsState,
                      newMatrixSet(corresponding4pcDefinition)
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
            {matrixSet2pc2Snap && matrixSet2pc2State && (
              <MatrixStarsSelector
                stars={matrixSet2pc2Snap.stars}
                onStarsChange={(stars) => {
                  setStars(matrixSet2pc2State, stars);
                }}
              />
            )}
          </Stack>
        </Stack>
      )}

      {matrixSetPieces === 4 && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <MatrixSetDefinitionSelector
            options={options4pc}
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
          {matrixSet4pcSnap && matrixSet4pcState && (
            <MatrixStarsSelector
              stars={matrixSet4pcSnap.stars}
              onStarsChange={(stars) => {
                setStars(matrixSet4pcState, stars);
              }}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
