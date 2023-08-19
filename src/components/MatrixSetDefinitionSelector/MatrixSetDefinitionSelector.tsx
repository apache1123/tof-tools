import { Autocomplete, TextField } from '@mui/material';

import type { MatrixSetDefinition } from '../../models/matrix-set-definition';

export interface MatrixSetDefinitionSelectorProps {
  options: MatrixSetDefinition[];
  selectedMatrixSetDefinition: MatrixSetDefinition | undefined;
  onChange(matrixSetDefinition: MatrixSetDefinition | undefined): void;
}

export function MatrixSetDefinitionSelector({
  options,
  selectedMatrixSetDefinition,
  onChange,
}: MatrixSetDefinitionSelectorProps) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.displayName}
      renderInput={(params) => (
        <TextField {...params} label="Select matrices" variant="standard" />
      )}
      value={selectedMatrixSetDefinition ?? null}
      onChange={(_, value) => {
        onChange(value ?? undefined);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      size="small"
      fullWidth
    />
  );
}
