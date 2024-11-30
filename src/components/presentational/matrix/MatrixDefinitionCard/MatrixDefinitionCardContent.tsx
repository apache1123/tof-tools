import type { SxProps } from "@mui/material";
import { Stack, Typography } from "@mui/material";

import type { MatrixDefinitionId } from "../../../../definitions/matrices/matrix-definitions";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";

export interface MatrixDefinitionCardContentProps {
  definitionId: MatrixDefinitionId;
  displayName: string;
  sx?: SxProps;
}

export function MatrixDefinitionCardContent({
  definitionId,
  displayName,
  sx,
}: MatrixDefinitionCardContentProps) {
  return (
    <Stack sx={{ gap: 1, alignItems: "center", ...sx }}>
      <MatrixIcon
        definitionId={definitionId}
        displayName={displayName}
        size={180}
      />
      <Typography sx={{ mt: -4 }}>{displayName}</Typography>
    </Stack>
  );
}
