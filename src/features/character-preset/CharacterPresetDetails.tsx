import { Box, Divider } from "@mui/material";
import { useSnapshot } from "valtio";

import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import type { CharacterData } from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character-preset/character-preset";
import { CharacterPresetGearComparison } from "./CharacterPresetGearComparison";
import { EditCharacterPreset } from "./EditCharacterPreset/EditCharacterPreset";

export interface CharacterPresetDetailsProps {
  characterPresetProxy: CharacterPreset;
  characterDataProxy: CharacterData;
}

export function CharacterPresetDetails({
  characterPresetProxy,
  characterDataProxy,
}: CharacterPresetDetailsProps) {
  const characterPreset = useSnapshot(characterPresetProxy) as CharacterPreset;
  const characterData = useSnapshot(characterDataProxy) as CharacterData;

  return (
    <>
      <Box>
        <SectionSubheading>Edit preset</SectionSubheading>
        <EditCharacterPreset
          characterPresetProxy={characterPresetProxy}
          characterDataProxy={characterDataProxy}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <SectionSubheading>Gear comparison</SectionSubheading>
        <CharacterPresetGearComparison
          characterData={characterData}
          characterPreset={characterPreset}
        />
      </Box>
    </>
  );
}
