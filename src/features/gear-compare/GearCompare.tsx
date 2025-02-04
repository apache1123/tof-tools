import { Stack } from "@mui/material";
import { useProxy } from "valtio/utils";

import { db } from "../../db/reactive-local-storage-db";
import type {
  CharacterData,
  CharacterId,
} from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { EditCharacterPresetSection } from "./EditCharacterPresetSection";
import { GearCompareResults } from "./GearCompareResults";
import { GearSection } from "./GearSection";
import { SelectCharacterPresetSection } from "./SelectCharacterPresetSection";

export interface GearCompareProps {
  characterId: CharacterId;
  characterData: CharacterData;
}

export function GearCompare({ characterId, characterData }: GearCompareProps) {
  const $state = useProxy(gearCompareState);

  const characterPresetProxy = $state.characterPresetId
    ? db.get("characterPresets").find($state.characterPresetId)
    : undefined;

  const currentGearProxy = $state.gearTypeId
    ? characterPresetProxy?.gearSetPreset?.gearSet.getSlot($state.gearTypeId)
        .gear
    : undefined;

  const newGearProxy = $state.newGearId
    ? db.get("gears").find($state.newGearId)
    : undefined;

  return (
    <Stack sx={{ gap: 2 }}>
      <SelectCharacterPresetSection characterId={characterId} />

      {characterPresetProxy && (
        <EditCharacterPresetSection
          selectedCharacterPresetProxy={characterPresetProxy}
        />
      )}

      {characterPresetProxy && currentGearProxy && newGearProxy && (
        <>
          <GearSection
            characterId={characterId}
            currentGearProxy={currentGearProxy}
            newGearProxy={newGearProxy}
          />
          {characterPresetProxy.teamPreset &&
            characterPresetProxy.gearSetPreset?.gearSet && (
              <GearCompareResults
                characterData={characterData}
                characterPresetProxy={characterPresetProxy}
                teamPresetProxy={characterPresetProxy.teamPreset}
                gearSetProxy={characterPresetProxy.gearSetPreset.gearSet}
                currentGearProxy={currentGearProxy}
                newGearProxy={newGearProxy}
              />
            )}
        </>
      )}
    </Stack>
  );
}
