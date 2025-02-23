import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { MatrixIcon } from "../../components/matrix/MatrixIcon/MatrixIcon";
import { MatrixStarsSelector } from "../../components/matrix/MatrixStarsSelector/MatrixStarsSelector";
import type { Matrix } from "../../models/matrix/matrix";

export interface EditMatrixProps {
  matrixProxy: Matrix;
}

export function EditMatrix({ matrixProxy }: EditMatrixProps) {
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
