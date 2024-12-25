import { Stack, Typography } from "@mui/material";

import type { MatrixDefinitionId } from "../../../../definitions/matrices/matrix-definitions";
import type { HasSxProps } from "../../../helpers/has-sx-props";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";

export interface MatrixDefinitionCardContentProps extends HasSxProps {
  definitionId: MatrixDefinitionId;
  displayName: string;
  showName?: boolean;
  iconSize?: number;
}

export function MatrixDefinitionCardContent({
  definitionId,
  displayName,
  showName = true,
  iconSize = 100,
  sx,
}: MatrixDefinitionCardContentProps) {
  return (
    <Stack sx={{ gap: 0.5, alignItems: "center", ...sx }}>
      <MatrixIcon
        definitionId={definitionId}
        displayName={displayName}
        size={iconSize}
      />

      {showName && <Typography>{displayName}</Typography>}
    </Stack>
  );
}
