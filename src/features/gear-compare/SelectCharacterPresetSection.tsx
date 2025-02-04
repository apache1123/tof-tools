import { Paper } from "@mui/material";

import { SectionTitle } from "../../components/common/SectionTitle/SectionTitle";
import type { CharacterId } from "../../models/character/character-data";
import { SelectCharacterPreset } from "./SelectCharacterPreset";

export interface SelectCharacterPresetSectionProps {
  characterId: CharacterId;
}

export function SelectCharacterPresetSection({
  characterId,
}: SelectCharacterPresetSectionProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <SectionTitle>Select preset</SectionTitle>

      <SelectCharacterPreset characterId={characterId} />
    </Paper>
  );
}
