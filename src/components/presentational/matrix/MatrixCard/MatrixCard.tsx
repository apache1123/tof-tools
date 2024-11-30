import type { SxProps } from "@mui/material";
import { Box, Card, CardActionArea, CardContent, Stack } from "@mui/material";

import type { Matrix } from "../../../../models/matrix/matrix";
import { MatrixDefinitionCardContent } from "../MatrixDefinitionCard/MatrixDefinitionCardContent";
import { MatrixStarsSelector } from "../MatrixStarsSelector/MatrixStarsSelector";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixCardProps {
  matrix: Matrix;
  onClick?: () => void;
  sx?: SxProps;
}

export function MatrixCard({ matrix, onClick, sx }: MatrixCardProps) {
  return (
    <Card sx={{ width: "fit-content", ...sx }}>
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
          <Stack sx={{ gap: 2, alignItems: "center" }}>
            <Box sx={{ position: "relative" }}>
              <MatrixDefinitionCardContent
                definitionId={matrix.definitionId}
                displayName={matrix.displayName}
              />
              <MatrixTypeIcon
                id={matrix.type.id}
                displayName={matrix.type.displayName}
                size={40}
                sx={{ position: "absolute", right: 5, bottom: 30 }}
              />
            </Box>

            <MatrixStarsSelector stars={matrix.stars} readOnly sx={{ mb: 2 }} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
