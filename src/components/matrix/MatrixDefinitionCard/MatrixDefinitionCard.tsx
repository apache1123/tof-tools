import { Card, CardActionArea, CardContent } from "@mui/material";

import type { MatrixDefinitionId } from "../../../definitions/matrices/matrix-definitions";
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
        component={onClick ? "button" : "div"}
        disabled={!onClick}
        onClick={() => {
          if (onClick) onClick(definitionId);
        }}
      >
        <CardContent sx={{ p: 1 }}>
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
