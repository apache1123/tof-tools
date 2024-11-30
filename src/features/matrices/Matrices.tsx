import { Button, Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { MatrixList } from "../../components/presentational/matrix/MatrixList/MatrixList";
import { matricesState } from "../../states/states";

export function Matrices() {
  const matricesSnap = useSnapshot(matricesState);

  return (
    <>
      <Stack sx={{ gap: 2 }}>
        <Button variant="contained" onClick={() => {}}>
          Add matrix
        </Button>
        <MatrixList matrices={matricesSnap.getCurrentCharacterMatrices()} />
      </Stack>
    </>
  );
}
