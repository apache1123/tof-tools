import { Paper } from "@mui/material";
import { useSnapshot } from "valtio";
import { useProxy } from "valtio/utils";

import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import type {
  CharacterData,
  CharacterId,
} from "../../models/character/character-data";
import type { CharacterPreset } from "../../models/character-preset/character-preset";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useRepositoryItem } from "../common/useRepositoryItem";
import { GearCompareResults } from "./GearCompareResults";
import { GearSection } from "./GearSection";

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

  const $state = useProxy(gearCompareState);
  const { gearTypeId, newGearId } = $state;

  const getCurrentGear = (characterPreset: CharacterPreset) => {
    return gearTypeId
      ? characterPreset.gearSetPreset?.gearSet.getSlot(gearTypeId).gear
      : undefined;
  };
  const currentGear = getCurrentGear(characterPreset);
  const currentGearProxy = getCurrentGear(characterPresetProxy);

  const { item: newGear, itemProxy: newGearProxy } = useRepositoryItem(
    "gears",
    (repository) => (newGearId ? repository.find(newGearId) : undefined),
  );

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

      {characterPreset.teamPreset &&
        characterPreset.gearSetPreset?.gearSet &&
        currentGear &&
        newGear && (
          <GearCompareResults
            characterData={characterData}
            characterPreset={characterPreset}
            teamPreset={characterPreset.teamPreset}
            gearSet={characterPreset.gearSetPreset.gearSet}
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
