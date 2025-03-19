import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import type {
  CharacterData,
  CharacterId,
} from "../../models/character/character-data";
import { EditCharacterPresetSection } from "./EditCharacterPresetSection";
import { GearAndResultsSection } from "./GearAndResultsSection";
import { useCharacterPreset } from "./hooks/useCharacterPreset";
import { SelectCharacterPresetSection } from "./SelectCharacterPresetSection";

export interface GearCompareProps {
  characterId: CharacterId;
  characterDataProxy: CharacterData;
}

export function GearCompare({
  characterId,
  characterDataProxy,
}: GearCompareProps) {
  const characterData = useSnapshot(characterDataProxy) as CharacterData;

  const { characterPreset, characterPresetProxy } = useCharacterPreset();

  return (
    <Stack sx={{ gap: 2 }}>
      <SelectCharacterPresetSection characterId={characterId} />

      {characterPreset && characterPresetProxy && (
        <EditCharacterPresetSection
          characterPresetProxy={characterPresetProxy}
          characterDataProxy={characterDataProxy}
        />
      )}

      {characterPreset && characterPresetProxy && (
        <GearAndResultsSection
          characterId={characterId}
          characterData={characterData}
          characterPresetProxy={characterPresetProxy}
        />
      )}
    </Stack>
  );
}
