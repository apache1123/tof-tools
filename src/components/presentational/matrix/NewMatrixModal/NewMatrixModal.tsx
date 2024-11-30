import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

import type { MatrixDefinitionId } from "../../../../definitions/matrices/matrix-definitions";
import type { MatrixDefinition } from "../../../../definitions/types/matrix/matrix-definition";
import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import { StyledModal } from "../../common/Modal/StyledModal";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";
import { MatrixPiecesIcon } from "../MatrixPiecesIcon/MatrixPiecesIcon";
import { MatrixStarsSelector } from "../MatrixStarsSelector/MatrixStarsSelector";
import { MatrixTypeToggle } from "../MatrixTypeToggle/MatrixTypeToggle";

export interface NewMatrixModalProps {
  definition: MatrixDefinition;
  open: boolean;
  onConfirm({
    definitionId,
    typeIds,
    stars,
  }: {
    definitionId: MatrixDefinitionId;
    typeIds: MatrixTypeId[];
    stars: number;
  }): void;
  onCancel(): void;
}

export function NewMatrixModal({
  definition,
  open,
  onConfirm,
  onCancel,
}: NewMatrixModalProps) {
  const [typeIds, setTypeIds] = useState<MatrixTypeId[]>([]);
  const [stars, setStars] = useState(0);

  return (
    <StyledModal
      open={open}
      modalTitle="Add new matrices"
      modalContent={
        <Stack sx={{ gap: 2, alignItems: "center" }}>
          <Box sx={{ my: -4 }}>
            <MatrixIcon
              definitionId={definition.id}
              displayName={definition.displayName}
              size={150}
            />
          </Box>

          <Box>
            <Typography gutterBottom>Add one or multiple pieces:</Typography>
            <MatrixTypeToggle
              values={typeIds}
              enforceAtLeastOne
              onChange={setTypeIds}
            />
          </Box>

          {!!typeIds.length && (
            <Stack sx={{ gap: 1, alignItems: "center" }}>
              <MatrixPiecesIcon
                definitionId={definition.id}
                displayName={definition.displayName}
                pieces={typeIds.length}
              />
              <MatrixStarsSelector stars={stars} onStarsChange={setStars} />
            </Stack>
          )}
        </Stack>
      }
      showConfirm
      showCancel
      isConfirmDisabled={typeIds.length === 0}
      onConfirm={() => {
        onConfirm({
          definitionId: definition.id,
          typeIds,
          stars,
        });
      }}
      onClose={onCancel}
    />
  );
}
