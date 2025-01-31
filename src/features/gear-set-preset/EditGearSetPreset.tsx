import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { db } from "../../db/reactive-local-storage-db";
import type { GearSetPreset } from "../../models/gear/gear-set-preset";
import { EditGearSet } from "./EditGearSet";

export interface EditGearSetPresetProps {
  presetProxy: GearSetPreset;
  onFinish(): void;
}

export function EditGearSetPreset({
  presetProxy,
  onFinish,
}: EditGearSetPresetProps) {
  const preset = useSnapshot(presetProxy);
  const { characterId, name } = preset;

  return (
    <EditorModal
      modalContent={
        <Stack sx={{ gap: 2 }}>
          <TextField
            label="Preset name"
            value={name}
            onChange={(e) => {
              presetProxy.name = e.target.value;
            }}
          />
          <EditGearSet
            gearSetProxy={presetProxy.gearSet}
            characterId={characterId}
          />
        </Stack>
      }
      open={!!preset}
      onClose={onFinish}
      itemName={preset.name}
      showDelete
      onDelete={() => {
        db.get("gearSetPresets").remove(presetProxy.id);
        onFinish();
      }}
      maxWidth={false}
      fullWidth
    />
  );
}
