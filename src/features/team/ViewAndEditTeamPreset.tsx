import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import type { PropsWithElevation } from "../../components/__helpers__/props-with-elevation";
import { TeamPresetCard } from "../../components/team/TeamPresetCard/TeamPresetCard";
import type { TeamPreset } from "../../models/team/team-preset";
import { EditTeamPreset } from "./EditTeamPreset";

export interface ViewAndEditTeamPresetProps extends PropsWithElevation {
  teamPresetProxy: TeamPreset;
  /** Force into edit state. By default, edit is triggered by clicking on the card. */
  forceEdit?: boolean;
  onFinishEdit?(): void;
}

export function ViewAndEditTeamPreset({
  teamPresetProxy,
  forceEdit,
  onFinishEdit,
  elevation,
}: ViewAndEditTeamPresetProps) {
  const teamPreset = useSnapshot(teamPresetProxy) as TeamPreset;

  const [isEditing, setIsEditing] = useState<boolean>(!!forceEdit);
  useEffect(() => {
    if (forceEdit !== undefined) {
      setIsEditing(forceEdit);
    }
  }, [forceEdit]);

  return (
    <>
      <TeamPresetCard
        teamPreset={teamPreset}
        onClick={() => {
          setIsEditing(true);
        }}
        elevation={elevation}
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
