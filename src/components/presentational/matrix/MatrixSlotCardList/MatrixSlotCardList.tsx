import { Stack } from "@mui/material";

import type { MatrixSlot } from "../../../../models/matrix/matrix-slot";
import { MatrixSlotCard } from "../MatrixSlotCard/MatrixSlotCard";

export interface MatrixSlotListProps {
  matrixSlots: MatrixSlot[];
  onClick(matrixSlot: MatrixSlot): void;
  onRemove(matrixSlot: MatrixSlot): void;
}

export function MatrixSlotCardList({
  matrixSlots,
  onClick,
  onRemove,
}: MatrixSlotListProps) {
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
      {matrixSlots.map((slot) => (
        <MatrixSlotCard
          key={slot.acceptsType.id}
          type={slot.acceptsType}
          matrix={slot.matrix}
          onClick={() => {
            onClick(slot);
          }}
          onRemove={() => {
            onRemove(slot);
          }}
        />
      ))}
    </Stack>
  );
}
