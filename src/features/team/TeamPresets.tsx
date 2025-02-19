import { useState } from "react";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { TeamPresetId } from "../../models/team/team-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { AddTeamPreset } from "./AddTeamPreset";
import { ViewAndEditTeamPreset } from "./ViewAndEditTeamPreset";

export interface TeamPresetsProps {
  characterId: CharacterId;
}

export function TeamPresets({ characterId }: TeamPresetsProps) {
  const teamPresetsRepo = db.get("teamPresets");

  const { items } = useItemsBelongingToCharacter(teamPresetsRepo, characterId);

  const [editPresetId, setEditPresetId] = useState<TeamPresetId | undefined>(
    undefined,
  );

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <AddTeamPreset
            characterId={characterId}
            onAdded={(id) => setEditPresetId(id)}
          />
        }
        items={items.map((teamPreset) => {
          const teamPresetProxy = teamPresetsRepo.find(teamPreset.id);
          return (
            teamPresetProxy && (
              <ViewAndEditTeamPreset
                key={teamPresetProxy.id}
                teamPresetProxy={teamPresetProxy}
                defaultEdit={teamPreset.id === editPresetId}
                onFinishEdit={() => {
                  setEditPresetId(undefined);
                }}
              />
            )
          );
        })}
      />
    </>
  );
}
