import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import {
  matrixSet2pcLabel,
  matrixSet4pcLabel,
} from "../../definitions/matrix-set-definitions";
import type { MatrixSetPieces } from "../../models/matrix-set-definition";

export interface MatrixSetPiecesSelectorProps {
  matrixSetPieces: MatrixSetPieces;
  onChange(matrixSetPieces: MatrixSetPieces): void;
}

export function MatrixSetPiecesSelector({
  matrixSetPieces,
  onChange,
}: MatrixSetPiecesSelectorProps) {
  return (
    <ToggleButtonGroup
      value={matrixSetPieces}
      onChange={(_, value) => {
        onChange(value);
      }}
      exclusive
      color="primary"
      size="small"
      aria-label="matrix pieces"
    >
      <ToggleButton value={2} aria-label={matrixSet2pcLabel}>
        {matrixSet2pcLabel}
      </ToggleButton>
      <ToggleButton value={4} aria-label={matrixSet4pcLabel}>
        {matrixSet4pcLabel}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
