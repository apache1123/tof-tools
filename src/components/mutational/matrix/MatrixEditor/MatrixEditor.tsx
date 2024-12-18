import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import type { Matrix } from "../../../../models/matrix/matrix";
import { MatrixIcon } from "../../../presentational/matrix/MatrixIcon/MatrixIcon";
import { MatrixStarsSelector } from "../../../presentational/matrix/MatrixStarsSelector/MatrixStarsSelector";

export interface MatrixEditorProps {
  matrixProxy: Matrix;
}

export function MatrixEditor({ matrixProxy }: MatrixEditorProps) {
  const { definitionId, displayName, stars } = useSnapshot(matrixProxy);

  return (
    <Stack sx={{ gap: 1, alignItems: "center" }}>
      <MatrixIcon
        definitionId={definitionId}
        displayName={displayName}
        size={120}
      />
      <MatrixStarsSelector
        stars={stars}
        onStarsChange={(stars) => {
          matrixProxy.stars = stars;
        }}
      />
    </Stack>
  );
}
