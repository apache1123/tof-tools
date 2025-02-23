import { Card, CardContent, CardHeader, Stack } from "@mui/material";

import type { Matrix } from "../../../models/matrix/matrix";
import type { MatrixType } from "../../../models/matrix/matrix-type";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { AddToSlotButton } from "../../common/AddToSlotButton/AddToSlotButton";
import { RemoveFromSlotButton } from "../../common/RemoveFromSlotButton/RemoveFromSlotButton";
import { SwapButton } from "../../common/SwapButton/SwapButton";
import { MatrixCard } from "../MatrixCard/MatrixCard";
import { MatrixTypeIcon } from "../MatrixTypeIcon/MatrixTypeIcon";

export interface MatrixSlotCardProps extends PropsWithSx {
  type: MatrixType;
  matrix: Matrix | undefined;
  onEdit(): void;
  onSwap(): void;
  onRemove(): void;
}

export function MatrixSlotCard({
  type,
  matrix,
  onEdit,
  onSwap,
  onRemove,
  sx,
}: MatrixSlotCardProps) {
  return (
    <Card
      sx={{
        width: 130,
        height: 270,
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <CardHeader
        avatar={
          <MatrixTypeIcon
            id={type.id}
            displayName={type.displayName}
            size={30}
          />
        }
        sx={{ p: 0, pt: 0.5, pl: 0.5 }}
      />
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          pt: 0,
          px: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          {matrix ? (
            <Stack sx={{ gap: 0.5 }}>
              <MatrixCard
                matrix={matrix}
                showName={false}
                showTypeIcon={false}
                matrixIconSize={100}
                elevation={1}
                onClick={onEdit}
              />
              <SwapButton onClick={onSwap} />
              <RemoveFromSlotButton onClick={onRemove} />
            </Stack>
          ) : (
            <AddToSlotButton onClick={onSwap} />
          )}
        </>
      </CardContent>
    </Card>
  );
}
