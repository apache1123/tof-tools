import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnapshot } from "valtio";

import type { Gear } from "../../models/gear/gear";
import type { GearSetPreset } from "../../models/gear/gear-set-preset";
import { GearSetEditor } from "./GearSetEditor";

export interface GearSetPresetEditorProps {
  presetProxy: GearSetPreset;
  onAddGear(gear: Gear): void;
}

export function GearSetPresetEditor({
  presetProxy,
  onAddGear,
}: GearSetPresetEditorProps) {
  const { characterId, name } = useSnapshot(presetProxy);

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        label="Preset name"
        value={name}
        onChange={(e) => {
          presetProxy.name = e.target.value;
        }}
      />
      <GearSetEditor
        gearSetProxy={presetProxy.gearSet}
        characterId={characterId}
        onAddGear={onAddGear}
      />
    </Stack>
  );
}
