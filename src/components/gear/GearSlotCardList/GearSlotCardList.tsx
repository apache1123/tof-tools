import { Stack } from "@mui/material";

import type { GearSlot } from "../../../models/gear/gear-slot";
import { GearSlotCard } from "../GearSlotCard/GearSlotCard";

export interface GearSlotCardListProps {
  gearSlots: GearSlot[];
  onClick?(gearSlot: GearSlot): void;
}

export function GearSlotCardList({
  gearSlots,
  onClick,
}: GearSlotCardListProps) {
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
      {gearSlots.map((slot) => (
        <GearSlotCard
          key={slot.acceptsType.id}
          type={slot.acceptsType}
          gear={slot.gear}
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
