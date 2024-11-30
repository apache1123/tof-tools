import { Autocomplete, TextField } from "@mui/material";

import {
  matrixSet2pcOrder,
  matrixSet4pcOrder,
} from "../../../../definitions/matrices/matrix-set-definitions";
import {
  getMatrixSetDefinition,
  type MatrixSetDefinition,
} from "../../../../models/matrix-set-definition";

const options2pc = matrixSet2pcOrder.map((id) => getMatrixSetDefinition(id));
const options4pc = matrixSet4pcOrder.map((id) => getMatrixSetDefinition(id));

export interface MatrixSet2pcDefinitionSelectorProps {
  selectedMatrixSetDefinition: MatrixSetDefinition | undefined;
  onChange(matrixSetDefinition: MatrixSetDefinition | undefined): void;
}

export function MatrixSet2pcDefinitionSelector({
  selectedMatrixSetDefinition,
  onChange,
}: MatrixSet2pcDefinitionSelectorProps) {
  return (
    <MatrixSetDefinitionSelector
      options={options2pc}
      selectedMatrixSetDefinition={selectedMatrixSetDefinition}
      onChange={onChange}
    />
  );
}

export interface MatrixSet4pcDefinitionSelectorProps {
  selectedMatrixSetDefinition: MatrixSetDefinition | undefined;
  onChange(matrixSetDefinition: MatrixSetDefinition | undefined): void;
}

export function MatrixSet4pcDefinitionSelector({
  selectedMatrixSetDefinition,
  onChange,
}: MatrixSet4pcDefinitionSelectorProps) {
  return (
    <MatrixSetDefinitionSelector
      options={options4pc}
      selectedMatrixSetDefinition={selectedMatrixSetDefinition}
      onChange={onChange}
    />
  );
}

interface MatrixSetDefinitionSelectorProps {
  options: MatrixSetDefinition[];
  selectedMatrixSetDefinition: MatrixSetDefinition | undefined;
  onChange(matrixSetDefinition: MatrixSetDefinition | undefined): void;
}

function MatrixSetDefinitionSelector({
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
