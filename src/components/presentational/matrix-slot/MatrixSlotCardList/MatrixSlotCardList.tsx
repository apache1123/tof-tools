import { Stack } from "@mui/material";

import type { MatrixSlot } from "../../../../models/matrix/matrix-slot";
import type { MatrixSlots } from "../../../../models/matrix/matrix-slots";
import { MatrixSlotCard } from "../MatrixSlotCard/MatrixSlotCard";

export interface MatrixSlotListProps {
  matrixSlots: MatrixSlots;
  onClick?(matrixSlot: MatrixSlot): void;
}

export function MatrixSlotCardList({
  matrixSlots,
  onClick,
}: MatrixSlotListProps) {
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
      {matrixSlots.getSlots().map((slot) => (
        <MatrixSlotCard
          key={slot.acceptsType.id}
          type={slot.acceptsType}
          matrix={slot.matrix}
          onClick={() => {
            if (onClick) {
              onClick(slot);
            }
          }}
        />
      ))}
    </Stack>
  );
}
