import { Card } from "@mui/material";
import { useProxy } from "valtio/utils";

import { CharacterPresetSelector } from "../../components/character-preset/CharacterPresetSelector/CharacterPresetSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";

export interface SelectCharacterPresetProps {
  characterId: CharacterId;
}

export function SelectCharacterPreset({
  characterId,
}: SelectCharacterPresetProps) {
  const $state = useProxy(gearCompareState);
  const { characterPresetId } = $state;

  const { items } = useItemsBelongingToCharacter(
    db.get("characterPresets"),
    characterId,
  );

  return (
    <Card sx={{ p: 3 }}>
      <CharacterPresetSelector
        presets={items}
        selectedPresetId={characterPresetId}
        onSelect={(presetId) => {
          $state.characterPresetId = presetId;
        }}
      />
    </Card>
  );
}
