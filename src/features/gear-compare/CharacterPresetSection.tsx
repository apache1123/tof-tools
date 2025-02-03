import { Paper, Stack } from "@mui/material";

import { SectionTitle } from "../../components/common/SectionTitle/SectionTitle";
import type { CharacterId } from "../../models/character/character-data";
import { SelectCharacterPreset } from "./SelectCharacterPreset";

export interface CharacterPresetSectionProps {
  characterId: CharacterId;
}

export function CharacterPresetSection({
  characterId,
}: CharacterPresetSectionProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <SectionTitle>Select preset</SectionTitle>

      <Stack sx={{ gap: 2 }}>
        <SelectCharacterPreset characterId={characterId} />
      </Stack>
    </Paper>
  );
}
