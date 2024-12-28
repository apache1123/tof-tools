import { Button } from "@mui/material";

import { InventoryLayout } from "../../../features/common/InventoryLayout";
import type { Gear, GearId } from "../../../models/gear/gear";
import { StyledModal } from "../../common/Modal/StyledModal";
import { GearList } from "../GearList/GearList";

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
          items={<GearList gears={gears} onClick={onSelect} />}
        />
      }
      showCancel
      onClose={onClose}
      maxWidth={false}
      fullWidth
    ></StyledModal>
  );
}
