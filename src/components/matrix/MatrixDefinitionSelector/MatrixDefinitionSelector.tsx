import { TextField } from "@mui/material";
import { useState } from "react";

import type { MatrixDefinition } from "../../../definitions/types/matrix/matrix-definition";
import { FilterLayout } from "../../../features/common/FilterLayout";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { MatrixDefinitionCard } from "../MatrixDefinitionCard/MatrixDefinitionCard";

export interface MatrixDefinitionSelectorProps {
  matrixDefinitions: MatrixDefinition[];
  onSelect(definition: MatrixDefinition): void;
}

export function MatrixDefinitionSelector({
  matrixDefinitions,
  onSelect,
}: MatrixDefinitionSelectorProps) {
  const [nameFilter, setNameFilter] = useState("");

  const filteredMatrixDefinitions = matrixDefinitions.filter((definition) =>
    definition.displayName.toLowerCase().includes(nameFilter.toLowerCase()),
  );

  return (
    <InventoryLayout
      filter={
        <FilterLayout
          filterContent={
            <TextField
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              label="Matrix name"
              variant="outlined"
              size="small"
              sx={{ width: 200 }}
            />
          }
          onResetFilter={() => {
            setNameFilter("");
          }}
        />
      }
      actions={undefined}
      items={filteredMatrixDefinitions.map((definition) => (
        <MatrixDefinitionCard
          key={definition.id}
          definitionId={definition.id}
          displayName={definition.displayName}
          onClick={() => onSelect(definition)}
        />
      ))}
    />
  );
}
