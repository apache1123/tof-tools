import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

import type { MatrixDefinition } from "../../../definitions/types/matrix/matrix-definition";
import type { MatrixType } from "../../../models/matrix/matrix-type";
import { StyledModal } from "../../common/Modal/StyledModal";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";
import { MatrixPiecesIcon } from "../MatrixPiecesIcon/MatrixPiecesIcon";
import { MatrixStarsSelector } from "../MatrixStarsSelector/MatrixStarsSelector";
import { MatrixTypeToggle } from "../MatrixTypeToggle/MatrixTypeToggle";

export interface NewMatrixModalProps {
  definition: MatrixDefinition;
  open: boolean;
  onConfirm({
    definition,
    types,
    stars,
  }: {
    definition: MatrixDefinition;
    types: MatrixType[];
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
  const [types, setTypes] = useState<MatrixType[]>([]);
  const [stars, setStars] = useState(0);

  return (
    <StyledModal
      open={open}
      modalTitle="Add matrix"
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
              values={types}
              enforceAtLeastOne
              onChange={setTypes}
            />
          </Box>

          {!!types.length && (
            <Stack sx={{ gap: 1, alignItems: "center" }}>
              <MatrixPiecesIcon
                definitionId={definition.id}
                displayName={definition.displayName}
                pieces={types.length}
              />
              <MatrixStarsSelector stars={stars} onStarsChange={setStars} />
            </Stack>
          )}
        </Stack>
      }
      showConfirm
      showCancel
      isConfirmDisabled={types.length === 0}
      onConfirm={() => {
        onConfirm({
          definition: definition,
          types,
          stars,
        });
      }}
      onClose={onCancel}
    />
  );
}
