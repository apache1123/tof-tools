import { Card, CardActionArea, CardContent } from "@mui/material";

import type { MatrixDefinitionId } from "../../../../definitions/matrices/matrix-definitions";
import { MatrixDefinitionCardContent } from "./MatrixDefinitionCardContent";

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
          <MatrixDefinitionCardContent
            definitionId={definitionId}
            displayName={displayName}
            sx={{ pb: 1 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
