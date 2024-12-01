import { getAllMatrixDefinitions } from "../../../../definitions/matrices/matrix-definitions";
import type { MatrixFilter } from "../../../../states/matrices/matrix-filter";
import { MatrixDefinitionAutocomplete } from "../MatrixDefinitionAutocomplete/MatrixDefinitionAutocomplete";

export interface MatrixFilterProps {
  filter: MatrixFilter;
  onChange(filter: MatrixFilter): void;
}

export function MatrixFilter({ filter, onChange }: MatrixFilterProps) {
  return (
    <MatrixDefinitionAutocomplete
      options={getAllMatrixDefinitions()}
      values={filter.definitions}
      onChange={(definitions) => {
        onChange({ ...filter, definitions });
      }}
    />
  );
}
