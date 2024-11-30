import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import type { MatrixDefinitionId } from "../../../definitions/matrices/matrix-definitions";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";

export interface MatrixDefinitionCardProps {
  definitionId: MatrixDefinitionId;
  displayName: string;
  onClick?(id: MatrixDefinitionId): void;
}

export function MatrixDefinitionCard({
  definitionId,
  displayName,
  onClick,
}: MatrixDefinitionCardProps) {
  return (
    <Card sx={{ width: "fit-content" }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick(definitionId);
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack sx={{ pb: 1, gap: 1, alignItems: "center" }}>
            <MatrixIcon
              definitionId={definitionId}
              displayName={displayName}
              size={180}
            />
            <Typography sx={{ mt: -4 }}>{displayName}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
