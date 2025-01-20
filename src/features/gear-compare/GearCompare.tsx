import { Stack } from "@mui/material";

import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { GearSection } from "./GearSection";
import { SelectCharacterPreset } from "./SelectCharacterPreset";

export interface GearCompareProps {
  characterId: CharacterId;
}

export function GearCompare({ characterId }: GearCompareProps) {
  const characterPresetProxy = gearCompareState.getCharacterPreset();

  return (
    <Stack sx={{ gap: 2 }}>
      <SelectCharacterPreset characterId={characterId} />

      {characterPresetProxy && <GearSection characterId={characterId} />}
    </Stack>
  );
}
