import { getAllMatrixDefinitions } from "../../../../definitions/matrices/matrix-definitions";
import type { MatrixFilter } from "../../../../states/matrix/matrix-filter";
import { MatrixDefinitionAutocomplete } from "../MatrixDefinitionAutocomplete/MatrixDefinitionAutocomplete";

export interface MatrixFilterProps {
  filter: MatrixFilter;
  onChange(filter: MatrixFilter): void;
}

export function MatrixFilter({ filter, onChange }: MatrixFilterProps) {
  const allDefinitions = getAllMatrixDefinitions();

  return (
    <MatrixDefinitionAutocomplete
      options={allDefinitions}
      values={allDefinitions.filter((definition) =>
        filter.definitionIds.includes(definition.id),
      )}
      onChange={(definitions) => {
        onChange({
          ...filter,
          definitionIds: definitions.map((definition) => definition.id),
        });
      }}
    />
  );
}
