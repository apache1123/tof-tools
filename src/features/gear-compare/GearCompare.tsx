import { Stack } from "@mui/material";
import { useProxy } from "valtio/utils";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";
import { GearSection } from "./GearSection";
import { SelectCharacterPreset } from "./SelectCharacterPreset";

export interface GearCompareProps {
  characterId: CharacterId;
}

export function GearCompare({ characterId }: GearCompareProps) {
  const $state = useProxy(gearCompareState);
  const { characterPresetId } = $state;

  const { itemProxies: characterPresetProxies } = useItemsBelongingToCharacter(
    db.get("characterPresets"),
    characterId,
  );

  const characterPresetProxy = characterPresetProxies.find(
    (preset) => preset.id === characterPresetId,
  );

  return (
    <Stack sx={{ gap: 2 }}>
      <SelectCharacterPreset characterId={characterId} />

      {characterPresetProxy && (
        <GearSection
          characterId={characterId}
          characterPresetProxy={characterPresetProxy}
        />
      )}
    </Stack>
  );
}
