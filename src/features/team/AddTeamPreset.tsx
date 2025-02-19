import { Button } from "../../components/common/Button/Button";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { TeamPresetId } from "../../models/team/team-preset";
import { TeamPreset } from "../../models/team/team-preset";

export interface AddTeamPresetProps {
  characterId: CharacterId;
  onAdded?(id: TeamPresetId): void;
}

export const AddTeamPreset = ({ characterId, onAdded }: AddTeamPresetProps) => {
  const teamPresetsRepo = db.get("teamPresets");

  return (
    <Button
      buttonProps={{ variant: "contained" }}
      onClick={() => {
        const newPreset = new TeamPreset(characterId);
        newPreset.name = "New team";
        teamPresetsRepo.add(newPreset);

        onAdded?.(newPreset.id);
      }}
    >
      Add team
    </Button>
  );
};
