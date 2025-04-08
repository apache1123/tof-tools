import { getAllMatrixDefinitions } from "../../../definitions/matrices/matrix-definitions";
import type { MatrixFilter } from "../../../models/matrix/matrix-filter";
import { MatrixDefinitionAutocomplete } from "../MatrixDefinitionAutocomplete/MatrixDefinitionAutocomplete";

export interface MatrixFilterEditorProps {
  filter: MatrixFilter;
  onChange(filter: MatrixFilter): void;
}

export function MatrixFilterEditor({
  filter,
  onChange,
}: MatrixFilterEditorProps) {
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
