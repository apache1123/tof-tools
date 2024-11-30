import { Stack } from "@mui/material";

import type { MatrixDefinitionId } from "../../../definitions/matrices/matrix-definitions";
import type { MatrixDefinition } from "../../../definitions/types/matrix/matrix-definition";
import { MatrixDefinitionCard } from "../MatrixDefinitionCard/MatrixDefinitionCard";

export interface MatrixDefinitionListProps {
  matrixDefinitions: MatrixDefinition[];
  onClick?(definitionId: MatrixDefinitionId): void;
}

export function MatrixDefinitionList({
  matrixDefinitions,
  onClick,
}: MatrixDefinitionListProps) {
  return (
    <Stack direction="row" gap={2} sx={{ flexWrap: "wrap" }}>
      {matrixDefinitions.map((matrixDefinition) => {
        const { id, displayName } = matrixDefinition;
        return (
          <MatrixDefinitionCard
            key={id}
            definitionId={id}
            displayName={displayName}
            onClick={() => {
              if (onClick) onClick(id);
            }}
          />
        );
      })}
    </Stack>
  );
}
