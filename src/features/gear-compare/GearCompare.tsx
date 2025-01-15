import { Card } from "@mui/material";
import { useSnapshot } from "valtio";

import { CharacterPresetSelector } from "../../components/character-preset/CharacterPresetSelector/CharacterPresetSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";

export interface GearCompareProps {
  characterId: CharacterId;
}

export function GearCompare({ characterId }: GearCompareProps) {
  const { items: characterPresets } = useItemsBelongingToCharacter(
    db.get("characterPresets"),
    characterId,
  );

  const { selectedCharacterPresetId } = useSnapshot(gearCompareState);
  const selectedCharacterPreset = characterPresets.find(
    (preset) => preset.id === selectedCharacterPresetId,
  );

  return (
    <Card sx={{ p: 3 }}>
      <CharacterPresetSelector
        presets={characterPresets}
        selectedPreset={selectedCharacterPreset}
        onSelect={(preset) => {
          gearCompareState.selectedCharacterPresetId = preset.id;
        }}
      />
    </Card>
  );
}
