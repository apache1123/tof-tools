import { Alert, TextField } from "@mui/material";
import { useSnapshot } from "valtio";

import type { CharacterData } from "../../../models/character/character-data";
import type { CharacterPreset } from "../../../models/character/character-preset";
import { EditCharacterPresetGearPreset } from "./EditCharacterPresetGearPreset";
import { EditCharacterPresetStats } from "./EditCharacterPresetStats";
import { EditCharacterPresetTeam } from "./EditCharacterPresetTeam";

export interface EditCharacterPresetProps {
  characterPresetProxy: CharacterPreset;
  characterDataProxy: CharacterData;
  expandTeam?: boolean;
  expandGearSet?: boolean;
  expandStats?: boolean;
  showInfoForGearCompare?: boolean;
}

export function EditCharacterPreset({
  characterPresetProxy,
  characterDataProxy,
  expandTeam,
  expandGearSet,
  expandStats,
  showInfoForGearCompare,
}: EditCharacterPresetProps) {
  const { name } = useSnapshot(characterPresetProxy) as CharacterPreset;

  return (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        A preset is a combination of a team (of weapons) and a gear preset. Same
        as how it is in-game.
      </Alert>

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
        showInfoForGearCompare={showInfoForGearCompare}
      />

      <EditCharacterPresetStats
        characterPresetProxy={characterPresetProxy}
        characterDataProxy={characterDataProxy}
        expand={expandStats}
      />
    </>
  );
}
