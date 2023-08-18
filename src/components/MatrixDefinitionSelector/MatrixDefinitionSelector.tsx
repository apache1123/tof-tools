import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useState } from 'react';

import {
  matrix2pcDefinitions,
  matrix4pcDefinitions,
} from '../../constants/matrix-definitions';
import type { MatrixDefinition } from '../../models/matrix-definition';

export interface SelectedMatrixDefinitions {
  selected4pcDefinition: MatrixDefinition | undefined;
  selected2pcDefinition1: MatrixDefinition | undefined;
  selected2pcDefinition2: MatrixDefinition | undefined;
}

export interface MatrixDefinitionSelectorProps {
  selectedDefinitions: SelectedMatrixDefinitions;
  onChange(selectedDefinitions: SelectedMatrixDefinitions): void;
}

enum MatrixPieces {
  '2pc' = '2pc',
  '4pc' = '4pc',
}

const options2pc = matrix2pcDefinitions.allIds.map(
  (id) => matrix2pcDefinitions.byId[id]
);
const options4pc = matrix4pcDefinitions.allIds.map(
  (id) => matrix4pcDefinitions.byId[id]
);

export function MatrixDefinitionSelector({
  selectedDefinitions,
  onChange,
}: MatrixDefinitionSelectorProps) {
  const [matrixPieces, setMatrixPieces] = useState<MatrixPieces>(
    MatrixPieces['2pc']
  );

  const finalMatrixPieces: MatrixPieces =
    selectedDefinitions.selected4pcDefinition
      ? MatrixPieces['4pc']
      : selectedDefinitions.selected2pcDefinition1 ||
        selectedDefinitions.selected2pcDefinition2
      ? MatrixPieces['2pc']
      : matrixPieces;

  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        value={finalMatrixPieces}
        onChange={(_, value) => {
          setMatrixPieces(value);
          onChange({
            selected4pcDefinition: undefined,
            selected2pcDefinition1: undefined,
            selected2pcDefinition2: undefined,
          });
        }}
        exclusive
        color="primary"
        aria-label="matrix pieces"
      >
        <ToggleButton value={MatrixPieces['2pc']} aria-label="left aligned">
          {MatrixPieces['2pc']}
        </ToggleButton>
        <ToggleButton value={MatrixPieces['4pc']} aria-label="centered">
          {MatrixPieces['4pc']}
        </ToggleButton>
      </ToggleButtonGroup>

      {finalMatrixPieces === MatrixPieces['2pc'] && (
        <Box>
          <Selector
            matrixPieces={finalMatrixPieces}
            options={options2pc}
            selectedMatrixDefinition={
              selectedDefinitions.selected2pcDefinition1
            }
            onChange={(matrixDefinition) => {
              onChange({
                ...selectedDefinitions,
                selected2pcDefinition1: matrixDefinition,
              });
            }}
          />
          <Selector
            matrixPieces={finalMatrixPieces}
            options={options2pc}
            selectedMatrixDefinition={
              selectedDefinitions.selected2pcDefinition2
            }
            onChange={(matrixDefinition) => {
              onChange({
                ...selectedDefinitions,
                selected2pcDefinition2: matrixDefinition,
              });
            }}
          />
        </Box>
      )}

      {finalMatrixPieces === MatrixPieces['4pc'] && (
        <Box>
          <Selector
            matrixPieces={finalMatrixPieces}
            options={options4pc}
            selectedMatrixDefinition={selectedDefinitions.selected4pcDefinition}
            onChange={(matrixDefinition) => {
              onChange({
                ...selectedDefinitions,
                selected4pcDefinition: matrixDefinition,
              });
            }}
          />
        </Box>
      )}
    </Stack>
  );
}

function Selector({
  matrixPieces,
  options,
  selectedMatrixDefinition,
  onChange,
}: {
  matrixPieces: MatrixPieces;
  options: MatrixDefinition[];
  selectedMatrixDefinition: MatrixDefinition | undefined;
  onChange(matrixDefinition: MatrixDefinition | undefined): void;
}) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => `${option.displayName} ${matrixPieces}`}
      renderInput={(params) => (
        <TextField {...params} label="Select matrices" variant="standard" />
      )}
      value={selectedMatrixDefinition ?? null}
      onChange={(_, value) => {
        onChange(value ?? undefined);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      size="small"
      fullWidth
    />
  );
}
