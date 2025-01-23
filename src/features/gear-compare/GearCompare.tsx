import { Stack } from "@mui/material";
import { useProxy } from "valtio/utils";

import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { CompareGear } from "./CompareGear";
import { GearSection } from "./GearSection";
import { SelectCharacterPreset } from "./SelectCharacterPreset";

export interface GearCompareProps {
  characterId: CharacterId;
}

export function GearCompare({ characterId }: GearCompareProps) {
  const characterPreset = useProxy(gearCompareState).getCharacterPreset();

  return (
    <Stack sx={{ gap: 2 }}>
      <SelectCharacterPreset characterId={characterId} />
      {characterPreset && <GearSection characterId={characterId} />}
      {characterPreset && <CompareGear />}
    </Stack>
  );
}
