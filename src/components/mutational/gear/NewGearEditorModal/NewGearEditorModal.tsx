import { Stack } from "@mui/material";
import { proxy, useSnapshot } from "valtio";

import { getGearType } from "../../../../definitions/gear-types";
import type { CharacterId } from "../../../../models/character/character";
import { Gear } from "../../../../models/gear/gear";
import { StyledModal } from "../../../presentational/common/Modal/StyledModal";
import { GearTypeToggle } from "../../../presentational/gear/GearTypeToggle/GearTypeToggle";
import { GearEditor } from "../GearEditor/GearEditor";

const state = proxy<{ newGear: Gear | undefined }>({
  newGear: undefined,
});

export interface NewGearEditorModalProps {
  characterId: CharacterId;
  open: boolean;
  onConfirm(gear: Gear): void;
  onCancel(): void;
}

export function NewGearEditorModal({
  characterId,
  open,
  onConfirm,
  onCancel,
}: NewGearEditorModalProps) {
  const { newGear } = useSnapshot(state);

  return (
    <StyledModal
      open={open}
      modalTitle="Add new gear"
      modalContent={
        <Stack sx={{ gap: 3, alignItems: "center" }}>
          <GearTypeToggle
            values={newGear ? [newGear.type.id] : []}
            exclusive
            enforceAtLeastOne
            onChange={(gearTypes) => {
              if (gearTypes[0]) {
                state.newGear = new Gear(
                  getGearType(gearTypes[0]),
                  characterId,
                );
              } else {
                state.newGear = undefined;
              }
            }}
          />
          {newGear && state.newGear && <GearEditor gearState={state.newGear} />}
        </Stack>
      }
      showConfirm
      showCancel
      isConfirmDisabled={!newGear}
      onConfirm={() => {
        if (state.newGear) {
          onConfirm(state.newGear);
          state.newGear = undefined;
        }
      }}
      onClose={onCancel}
      maxWidth={false}
      fullWidth
    />
  );
}
