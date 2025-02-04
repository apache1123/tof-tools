import { Paper } from "@mui/material";

import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
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
      <SectionHeading>Select preset</SectionHeading>

      <SelectCharacterPreset characterId={characterId} />
    </Paper>
  );
}
