import { useState } from "react";
import { useSnapshot } from "valtio";

import { Button } from "../../components/common/Button/Button";
import { EditorModal } from "../../components/common/Modal/EditorModal";
import { TeamPresetCard } from "../../components/team/TeamPresetCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import { TeamPreset } from "../../models/team/team-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { TeamPresetEditor } from "./TeamPresetEditor";

export interface TeamsProps {
  characterId: CharacterId;
}

export function Teams({ characterId }: TeamsProps) {
  const teamPresetsRepo = db.get("teamPresets");

  const teamPresets = useSnapshot(teamPresetsRepo).filter(
    (teamPreset) => teamPreset.characterId === characterId,
  ) as TeamPreset[];

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
              teamPresetsRepo.add(newPreset);

              const newPresetProxy = teamPresetsRepo.find(newPreset.id);
              setEditingTeamPresetProxy(newPresetProxy);
            }}
          >
            Add team
          </Button>
        }
        items={teamPresets.map((teamPreset) => (
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
        <EditorModal
          modalContent={
            <TeamPresetEditor teamPresetProxy={editingTeamPresetProxy} />
          }
          open={!!editingTeamPresetProxy}
          onClose={() => {
            setEditingTeamPresetProxy(undefined);
          }}
          itemName={
            !!editingTeamPresetProxy.name
              ? editingTeamPresetProxy.name
              : "this team"
          }
          showDelete
          onDelete={() => {
            teamPresetsRepo.remove(editingTeamPresetProxy.id);
            setEditingTeamPresetProxy(undefined);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
