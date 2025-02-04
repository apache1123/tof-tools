import { Paper } from "@mui/material";

import { SectionTitle } from "../../components/common/SectionTitle/SectionTitle";
import type { CharacterPreset } from "../../models/character/character-preset";
import { EditCharacterPreset } from "../character-preset/EditCharacterPreset";

export interface EditCharacterPresetSectionProps {
  selectedCharacterPresetProxy: CharacterPreset;
}

export function EditCharacterPresetSection({
  selectedCharacterPresetProxy,
}: EditCharacterPresetSectionProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <SectionTitle>Edit preset</SectionTitle>

      <EditCharacterPreset
        characterPresetProxy={selectedCharacterPresetProxy}
      />
    </Paper>
  );
}
