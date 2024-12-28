import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import type { MatrixDefinition } from "../../../definitions/types/matrix/matrix-definition";
import { CardList } from "../../common/CardList/CardList";
import { StyledModal } from "../../common/Modal/StyledModal";
import { MatrixDefinitionCard } from "../MatrixDefinitionCard/MatrixDefinitionCard";

export interface MatrixDefinitionSelectorModalProps {
  open: boolean;
  matrixDefinitions: MatrixDefinition[];
  title?: string;
  onSelect(definition: MatrixDefinition): void;
  onCancel(): void;
}

export function MatrixDefinitionSelectorModal({
  open,
  matrixDefinitions,
  title,
  onSelect,
  onCancel,
}: MatrixDefinitionSelectorModalProps) {
  const [nameFilter, setNameFilter] = useState("");

  const filteredMatrixDefinitions = matrixDefinitions.filter((definition) =>
    definition.displayName.toLowerCase().includes(nameFilter.toLowerCase()),
  );

  return (
    <StyledModal
      open={open}
      modalTitle={title}
      modalContent={
        <Stack sx={{ gap: 2 }}>
          <TextField
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            label="Matrix name"
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
          />
          <CardList>
            {filteredMatrixDefinitions.map((definition) => (
              <MatrixDefinitionCard
                key={definition.id}
                definitionId={definition.id}
                displayName={definition.displayName}
                onClick={() => onSelect(definition)}
              />
            ))}
          </CardList>
        </Stack>
      }
      showCancel
      onClose={onCancel}
      maxWidth={false}
      fullWidth
    />
  );
}
