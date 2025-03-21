import { Card, Stack } from "@mui/material";

import type { Matrix } from "../../../models/matrix/matrix";
import type { MatrixType } from "../../../models/matrix/matrix-type";
import type { PropsWithElevation } from "../../__helpers__/props-with-elevation";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { MatrixIcon } from "../MatrixIcon/MatrixIcon";
import { MatrixStarsSelector } from "../MatrixStarsSelector/MatrixStarsSelector";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixSlotIconProps extends PropsWithSx, PropsWithElevation {
  type: MatrixType;
  matrix?: Matrix;
  width?: number;
  height?: number;
}

export function MatrixSlotIcon({
  type,
  matrix,
  width = 70,
  height = 90,
  sx,
  elevation,
}: MatrixSlotIconProps) {
  return (
    <Card
      sx={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      elevation={elevation}
    >
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        {matrix ? (
          <>
            <MatrixIcon
              definitionId={matrix.definitionId}
              displayName={matrix.displayName}
              size={width * 0.9}
            />
            <MatrixStarsSelector stars={matrix.stars} size="small" readOnly />
          </>
        ) : (
          <MatrixTypeIcon
            id={type.id}
            displayName={type.displayName}
            size={width * 0.6}
          />
        )}
      </Stack>
    </Card>
  );
}
