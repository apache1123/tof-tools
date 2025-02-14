import { Stack } from "@mui/material";
import { useProxy } from "valtio/utils";

import type {
  CharacterData,
  CharacterId,
} from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useRepositoryItem } from "../common/useRepositoryItem";
import { EditCharacterPresetSection } from "./EditCharacterPresetSection";
import { GearAndResultsSection } from "./GearAndResultsSection";
import { SelectCharacterPresetSection } from "./SelectCharacterPresetSection";

export interface GearCompareProps {
  characterId: CharacterId;
  characterData: CharacterData;
}

export function GearCompare({ characterId, characterData }: GearCompareProps) {
  const { characterPresetId } = useProxy(gearCompareState);

  const { item: characterPreset, itemProxy: characterPresetProxy } =
    useRepositoryItem("characterPresets", (repository) => {
      return characterPresetId ? repository.find(characterPresetId) : undefined;
    });

  return (
    <Stack sx={{ gap: 2 }}>
      <SelectCharacterPresetSection characterId={characterId} />

      {characterPreset && characterPresetProxy && (
        <EditCharacterPresetSection
          selectedCharacterPresetProxy={characterPresetProxy}
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
