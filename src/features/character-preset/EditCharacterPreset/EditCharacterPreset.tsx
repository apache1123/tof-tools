import { Alert, Box, TextField } from "@mui/material";
import { useSnapshot } from "valtio/index";

import type { CharacterData } from "../../../models/character/character-data";
import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import { EditCharacterPresetGearPreset } from "./EditCharacterPresetGearPreset";
import { EditCharacterPresetSimulacrumTrait } from "./EditCharacterPresetSimulacrumTrait";
import { EditCharacterPresetStats } from "./EditCharacterPresetStats";
import { EditCharacterPresetTeam } from "./EditCharacterPresetTeam";

export interface EditCharacterPresetProps {
  characterPresetProxy: CharacterPreset;
  characterDataProxy: CharacterData;
  showInfoForGearCompare?: boolean;
}

export function EditCharacterPreset({
  characterPresetProxy,
  characterDataProxy,
  showInfoForGearCompare,
}: EditCharacterPresetProps) {
  const { name } = useSnapshot(characterPresetProxy) as CharacterPreset;

  return (
    <Box>
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

      <EditCharacterPresetTeam characterPresetProxy={characterPresetProxy} />

      <EditCharacterPresetGearPreset
        characterPresetProxy={characterPresetProxy}
        showInfoForGearCompare={showInfoForGearCompare}
      />

      <EditCharacterPresetSimulacrumTrait
        characterPresetProxy={characterPresetProxy}
      />

      <EditCharacterPresetStats
        characterPresetProxy={characterPresetProxy}
        characterDataProxy={characterDataProxy}
      />
    </Box>
  );
}
