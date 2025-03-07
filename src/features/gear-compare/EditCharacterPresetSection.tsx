import { Paper } from "@mui/material";

import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import type { CharacterData } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character-preset/character-preset";
import { EditCharacterPreset } from "../character-preset/EditCharacterPreset/EditCharacterPreset";

export interface EditCharacterPresetSectionProps {
  characterPresetProxy: CharacterPreset;
  characterDataProxy: CharacterData;
}

export function EditCharacterPresetSection({
  characterPresetProxy,
  characterDataProxy,
}: EditCharacterPresetSectionProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <SectionHeading>Edit preset</SectionHeading>

      <EditCharacterPreset
        characterPresetProxy={characterPresetProxy}
        characterDataProxy={characterDataProxy}
        showInfoForGearCompare
      />
    </Paper>
  );
}
