import { Stack, Typography } from "@mui/material";

import type { MatrixDefinitionId } from "../../../definitions/matrices/matrix-definitions";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";

export interface MatrixPiecesIconProps {
  definitionId: MatrixDefinitionId;
  displayName: string;
  pieces: number;
  size?: number;
}

/** Shows a number of pieces of a matrix type, stacked together */
export function MatrixPiecesIcon({
  definitionId,
  displayName,
  pieces,
  size = 100,
}: MatrixPiecesIconProps) {
  return (
    <Stack alignItems="center" width="max-content">
      <Stack direction="row" spacing={-size / 9} sx={{ mb: -1.5 }}>
        {[...Array(pieces)].map((_, index) => (
          <MatrixIcon
            key={index}
            definitionId={definitionId}
            displayName={displayName}
            size={size}
          />
        ))}
      </Stack>
      <Typography variant="body2">{`${displayName} ${pieces}pcs`}</Typography>
    </Stack>
  );
}
