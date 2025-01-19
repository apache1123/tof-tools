import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnapshot } from "valtio";

import type { GearSetPreset } from "../../models/gear/gear-set-preset";
import { EditGearSet } from "./EditGearSet";

export interface EditGearSetPresetProps {
  presetProxy: GearSetPreset;
}

export function EditGearSetPreset({ presetProxy }: EditGearSetPresetProps) {
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
      <EditGearSet
        gearSetProxy={presetProxy.gearSet}
        characterId={characterId}
      />
    </Stack>
  );
}
