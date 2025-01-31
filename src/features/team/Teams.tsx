import { useState } from "react";

import { Button } from "../../components/common/Button/Button";
import { TeamPresetCard } from "../../components/team/TeamPresetCard/TeamPresetCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import { TeamPreset } from "../../models/team/team-preset";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";
import { InventoryLayout } from "../common/InventoryLayout";
import { EditTeamPreset } from "./EditTeamPreset";

export interface TeamsProps {
  characterId: CharacterId;
}

export function Teams({ characterId }: TeamsProps) {
  const teamPresetsRepo = db.get("teamPresets");

  const { items } = useItemsBelongingToCharacter(teamPresetsRepo, characterId);

  const [editingTeamPresetProxy, setEditingTeamPresetProxy] = useState<
    TeamPreset | undefined
  >(undefined);

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <Button
            buttonProps={{ variant: "contained" }}
            onClick={() => {
              const newPreset = new TeamPreset(characterId);
              newPreset.name = "Team name";
              teamPresetsRepo.add(newPreset);

              const newPresetProxy = teamPresetsRepo.find(newPreset.id);
              setEditingTeamPresetProxy(newPresetProxy);
            }}
          >
            Add team
          </Button>
        }
        items={items.map((teamPreset) => (
          <TeamPresetCard
            key={teamPreset.id}
            teamPreset={teamPreset}
            onClick={() => {
              const presetProxy = teamPresetsRepo.find(teamPreset.id);
              if (!presetProxy) throw new Error("Preset not found");
              setEditingTeamPresetProxy(presetProxy);
            }}
          />
        ))}
      />

      {editingTeamPresetProxy && (
        <EditTeamPreset
          teamPresetProxy={editingTeamPresetProxy}
          onFinish={() => {
            setEditingTeamPresetProxy(undefined);
          }}
        />
      )}
    </>
  );
}
