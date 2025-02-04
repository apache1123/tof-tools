import { Paper, Stack } from "@mui/material";

import { SectionTitle } from "../../components/common/SectionTitle/SectionTitle";
import type { CharacterId } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character/character-preset";
import { ViewAndEditTeamPreset } from "../team/ViewAndEditTeamPreset";
import { SelectCharacterPreset } from "./SelectCharacterPreset";

export interface CharacterPresetSectionProps {
  characterId: CharacterId;
  selectedCharacterPresetProxy: CharacterPreset | undefined;
}

export function CharacterPresetSection({
  characterId,
  selectedCharacterPresetProxy,
}: CharacterPresetSectionProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <SectionTitle>Select preset</SectionTitle>

      <Stack sx={{ gap: 2 }}>
        <SelectCharacterPreset characterId={characterId} />

        {selectedCharacterPresetProxy?.teamPreset ? (
          <ViewAndEditTeamPreset
            teamPresetProxy={selectedCharacterPresetProxy.teamPreset}
          />
        ) : (
          "No team"
        )}
      </Stack>
    </Paper>
  );
}
