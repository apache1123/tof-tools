import type { CardProps, SxProps } from "@mui/material";
import { Card, CardActionArea, CardContent, Stack } from "@mui/material";

import type { Matrix } from "../../../../models/matrix/matrix";
import { MatrixDefinitionCardContent } from "../MatrixDefinitionCard/MatrixDefinitionCardContent";
import { MatrixStarsSelector } from "../MatrixStarsSelector/MatrixStarsSelector";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixCardProps {
  matrix: Matrix;
  showName?: boolean;
  showTypeIcon?: boolean;
  matrixIconSize?: number;
  onClick?: () => void;
  elevation?: CardProps["elevation"];
  sx?: SxProps;
}

export function MatrixCard({
  matrix,
  showName = true,
  showTypeIcon = true,
  matrixIconSize = 100,
  onClick,
  elevation,
  sx,
}: MatrixCardProps) {
  return (
    <Card elevation={elevation} sx={{ width: "fit-content", ...sx }}>
      <CardActionArea
        onClick={() => {
          if (onClick) onClick();
        }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {showTypeIcon && (
            <MatrixTypeIcon
              id={matrix.type.id}
              displayName={matrix.type.displayName}
              size={30}
              sx={{ mt: 0.5, ml: 0.5 }}
            />
          )}
          <Stack sx={{ m: 1, mt: 0, gap: 1, alignItems: "center" }}>
            <MatrixDefinitionCardContent
              definitionId={matrix.definitionId}
              displayName={matrix.displayName}
              showName={showName}
              iconSize={matrixIconSize}
            />
            <MatrixStarsSelector stars={matrix.stars} readOnly />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
