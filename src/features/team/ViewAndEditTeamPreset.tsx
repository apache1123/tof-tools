import { useState } from "react";
import { useSnapshot } from "valtio";

import { TeamPresetCard } from "../../components/team/TeamPresetCard/TeamPresetCard";
import type { TeamPreset } from "../../models/team/team-preset";
import { EditTeamPreset } from "./EditTeamPreset";

export interface ViewAndEditTeamPresetProps {
  teamPresetProxy: TeamPreset;
  /** Is in edit state by default */
  defaultEdit?: boolean;
  onFinishEdit?(): void;
}

export function ViewAndEditTeamPreset({
  teamPresetProxy,
  defaultEdit,
  onFinishEdit,
}: ViewAndEditTeamPresetProps) {
  const teamPreset = useSnapshot(teamPresetProxy) as TeamPreset;

  const [isEditing, setIsEditing] = useState<boolean>(!!defaultEdit);

  return (
    <>
      <TeamPresetCard
        teamPreset={teamPreset}
        onClick={() => {
          setIsEditing(true);
        }}
      />

      {isEditing && (
        <EditTeamPreset
          teamPresetProxy={teamPresetProxy}
          onFinish={() => {
            setIsEditing(false);
            onFinishEdit?.();
          }}
        />
      )}
    </>
  );
}
