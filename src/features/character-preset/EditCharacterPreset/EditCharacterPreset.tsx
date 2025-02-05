import { TextField } from "@mui/material";
import { useSnapshot } from "valtio";

import type { CharacterPreset } from "../../../models/character/character-preset";
import { EditCharacterPresetGearPreset } from "./EditCharacterPresetGearPreset";
import { EditCharacterPresetStats } from "./EditCharacterPresetStats";
import { EditCharacterPresetTeam } from "./EditCharacterPresetTeam";

export interface EditCharacterPresetProps {
  characterPresetProxy: CharacterPreset;
  expandTeam?: boolean;
  expandGearSet?: boolean;
  expandStats?: boolean;
}

export function EditCharacterPreset({
  characterPresetProxy,
  expandTeam,
  expandGearSet,
  expandStats,
}: EditCharacterPresetProps) {
  const { name } = useSnapshot(characterPresetProxy) as CharacterPreset;

  return (
    <>
      <TextField
        label="Preset name"
        value={name}
        onChange={(e) => {
          characterPresetProxy.name = e.target.value;
        }}
        fullWidth
        sx={{ mb: 2 }}
      />

      <EditCharacterPresetTeam
        characterPresetProxy={characterPresetProxy}
        expand={expandTeam}
      />

      <EditCharacterPresetGearPreset
        characterPresetProxy={characterPresetProxy}
        expand={expandGearSet}
      />

      <EditCharacterPresetStats
        characterPresetProxy={characterPresetProxy}
        expand={expandStats}
      />
    </>
  );
}
