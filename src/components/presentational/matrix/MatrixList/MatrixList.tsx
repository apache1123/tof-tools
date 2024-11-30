import { Stack } from "@mui/material";

import type { Matrix, MatrixId } from "../../../../models/matrix/matrix";
import { MatrixCard } from "../MatrixCard/MatrixCard";

export interface MatrixListProps {
  matrices: Matrix[];
  onClick?: (id: MatrixId) => void;
}

export function MatrixList({ matrices, onClick }: MatrixListProps) {
  return (
    <Stack direction="row" sx={{ gap: 2, flexWrap: "wrap" }}>
      {matrices.map((matrix) => (
        <MatrixCard
          key={matrix.id}
          matrix={matrix}
          onClick={() => {
            if (onClick) {
              onClick(matrix.id);
            }
          }}
        />
      ))}
    </Stack>
  );
}
