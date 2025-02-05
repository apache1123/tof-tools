import { Paper } from "@mui/material";

import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import type { CharacterPreset } from "../../models/character/character-preset";
import { EditCharacterPreset } from "../character-preset/EditCharacterPreset/EditCharacterPreset";

export interface EditCharacterPresetSectionProps {
  selectedCharacterPresetProxy: CharacterPreset;
}

export function EditCharacterPresetSection({
  selectedCharacterPresetProxy,
}: EditCharacterPresetSectionProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <SectionHeading>Edit preset</SectionHeading>

      <EditCharacterPreset
        characterPresetProxy={selectedCharacterPresetProxy}
      />
    </Paper>
  );
}
