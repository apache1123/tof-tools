import { Button } from "@mui/material";

import { InventoryLayout } from "../../../features/common/InventoryLayout";
import type { Gear, GearId } from "../../../models/gear/gear";
import { StyledModal } from "../../common/Modal/StyledModal";
import { GearCard } from "../GearCard/GearCard";

export interface GearSelectorModalProps {
  open: boolean;
  gears: Gear[];
  onSelect(gearId: GearId): void;
  onAdd?(): void;
  onClose(): void;
}

export function GearSelectorModal({
  open,
  gears,
  onSelect,
  onAdd,
  onClose,
}: GearSelectorModalProps) {
  return (
    <StyledModal
      open={open}
      modalContent={
        <InventoryLayout
          filter={undefined}
          actions={
            <Button
              variant="contained"
              onClick={() => {
                if (onAdd) onAdd();
              }}
            >
              Add gear
            </Button>
          }
          items={gears.map((gear) => (
            <GearCard
              key={gear.id}
              gear={gear}
              onClick={() => onSelect(gear.id)}
            />
          ))}
        />
      }
      showCancel
      onClose={onClose}
      maxWidth={false}
      fullWidth
    ></StyledModal>
  );
}
