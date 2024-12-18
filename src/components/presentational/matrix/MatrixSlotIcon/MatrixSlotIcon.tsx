import type { CardProps, SxProps } from "@mui/material";
import { Card } from "@mui/material";

import type { Matrix } from "../../../../models/matrix/matrix";
import type { MatrixType } from "../../../../models/matrix/matrix-type";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixSlotIconProps {
  type: MatrixType;
  matrix?: Matrix;
  size?: number;
  sx?: SxProps;
  elevation?: CardProps["elevation"];
}

export function MatrixSlotIcon({
  type,
  matrix,
  size = 50,
  sx,
  elevation,
}: MatrixSlotIconProps) {
  return (
    <Card
      sx={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      elevation={elevation}
    >
      {matrix ? (
        <MatrixIcon
          definitionId={matrix.definitionId}
          displayName={matrix.displayName}
          size={size * 0.9}
        />
      ) : (
        <MatrixTypeIcon
          id={type.id}
          displayName={type.displayName}
          size={size * 0.7}
        />
      )}
    </Card>
  );
}
