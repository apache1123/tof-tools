import { Stack } from "@mui/material";

import type { MatrixSlot } from "../../../../models/matrix/matrix-slot";
import type { MatrixSlotIconProps } from "../MatrixSlotIcon/MatrixSlotIcon";
import { MatrixSlotIcon } from "../MatrixSlotIcon/MatrixSlotIcon";

export interface MatrixSlotIconListProps
  extends Pick<MatrixSlotIconProps, "width" | "height"> {
  matrixSlots: MatrixSlot[];
}

export function MatrixSlotIconList({
  matrixSlots,
  width,
  height,
}: MatrixSlotIconListProps) {
  return (
    <Stack direction="row" sx={{ gap: 0.5 }}>
      {matrixSlots.map((slot) => (
        <MatrixSlotIcon
          key={slot.acceptsType.id}
          type={slot.acceptsType}
          matrix={slot.matrix}
          width={width}
          height={height}
          elevation={1}
        />
      ))}
    </Stack>
  );
}
