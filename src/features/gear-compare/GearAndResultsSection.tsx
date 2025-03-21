import { Paper } from "@mui/material";
import { useSnapshot } from "valtio";

import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import type {
  CharacterData,
  CharacterId,
} from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character-preset/character-preset";
import { GearCompareResults } from "./GearCompareResults";
import { GearSection } from "./GearSection";
import { useCurrentGear } from "./hooks/useCurrentGear";
import { useNewGear } from "./hooks/useNewGear";

export interface GearAndResultsSectionProps {
  characterId: CharacterId;
  characterData: CharacterData;
  characterPresetProxy: CharacterPreset;
}

export function GearAndResultsSection({
  characterId,
  characterData,
  characterPresetProxy,
}: GearAndResultsSectionProps) {
  const characterPreset = useSnapshot(characterPresetProxy) as CharacterPreset;

  const mainWeaponPreset = characterPreset.teamPreset?.getMainWeaponPreset();

  const { currentGear, currentGearProxy } = useCurrentGear();
  const { newGear, newGearProxy } = useNewGear();

  return mainWeaponPreset ? (
    <>
      <GearSection
        characterId={characterId}
        currentGear={currentGear}
        currentGearProxy={currentGearProxy}
        newGear={newGear}
        newGearProxy={newGearProxy}
        prioritizedElement={
          // TODO: What to do with altered?
          mainWeaponPreset.definition.damageElement === "Altered"
            ? undefined
            : mainWeaponPreset.definition.damageElement
        }
      />

      {currentGear && newGear && (
        <GearCompareResults
          characterData={characterData}
          characterPreset={characterPreset}
          currentGear={currentGear}
          newGear={newGear}
        />
      )}
    </>
  ) : (
    <Paper sx={{ p: 3 }}>
      <ErrorText>No team selected or no main weapon in team</ErrorText>
    </Paper>
  );
}
