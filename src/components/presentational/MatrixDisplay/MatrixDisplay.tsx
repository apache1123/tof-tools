import { Stack } from "@mui/material";

import type { MatrixSetName } from "../../../models/matrix-set-definition";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";
import { MatrixStarsSelector } from "../MatrixStarsSelector/MatrixStarsSelector";

export interface MatrixDisplayProps {
  matrixName: MatrixSetName;
  displayName: string;
  pieces: number;
  stars: number;
}

export function MatrixDisplay({
  matrixName,
  displayName,
  pieces,
  stars,
}: MatrixDisplayProps) {
  return (
    <Stack spacing={-2} alignItems="center" width="max-content">
      <Stack direction="row" spacing={-11}>
        {[...Array(pieces)].map((_, index) => (
          <MatrixIcon
            matrixDefinitionId={matrixName}
            displayName={displayName}
            key={index}
          />
        ))}
      </Stack>
      <MatrixStarsSelector stars={stars} disabled size="small" />
    </Stack>
  );
}
