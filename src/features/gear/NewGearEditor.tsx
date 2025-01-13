import { Stack } from "@mui/material";
import { proxy, useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { GearTypeToggle } from "../../components/gear/GearTypeToggle/GearTypeToggle";
import { getGearType } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character-data";
import { Gear } from "../../models/gear/gear";
import { GearEditor } from "./GearEditor";
import { GearOcrModal } from "./GearOcrModal";

const state = proxy<{ newGear: Gear | undefined }>({
  newGear: undefined,
});

export interface NewGearEditorProps {
  characterId: CharacterId;
  open: boolean;
  onConfirm(gear: Gear): void;
  onCancel(): void;
}

export function NewGearEditor({
  characterId,
  open,
  onConfirm,
  onCancel,
}: NewGearEditorProps) {
  const { newGear } = useSnapshot(state);

  return (
    <EditorModal
      open={open}
      modalTitle="Add new gear"
      modalContent={
        <Stack sx={{ gap: 3, alignItems: "center" }}>
          <GearOcrModal
            characterId={characterId}
            onFinalizeGear={(gear) => {
              state.newGear = gear;
            }}
          />
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
          {newGear && state.newGear && <GearEditor gearProxy={state.newGear} />}
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
