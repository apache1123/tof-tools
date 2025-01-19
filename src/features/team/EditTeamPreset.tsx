import { Alert, Stack, TextField } from "@mui/material";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { TeamPreset } from "../../models/team/team-preset";
import { EditTeamPresetWeapon } from "./EditTeamPresetWeapon";

export interface EditTeamPresetProps {
  teamPresetProxy: TeamPreset;
}

export function EditTeamPreset({ teamPresetProxy }: EditTeamPresetProps) {
  const teamPreset = useSnapshot(teamPresetProxy) as TeamPreset;
  const { name, characterId } = teamPreset;

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        label="Team name"
        value={name}
        onChange={(e) => {
          teamPresetProxy.name = e.target.value;
        }}
      />

      <Alert severity="info">
        The first weapon in the team is the main on-field weapon that deals the
        majority of the team&apos;s damage, and cannot be empty.
      </Alert>

      <CardList direction="column" gap={1}>
        {[...Array(TeamPreset.maxNumOfWeapons)].map((_, i) => (
          <EditTeamPresetWeapon
            key={i}
            weaponPreset={teamPreset.getWeaponPreset(i)}
            characterId={characterId}
            disabled={i !== 0 && !teamPreset.getWeaponPreset(0)}
            showSetAsMainButton={i !== 0}
            onChange={(weaponPresetProxy) => {
              teamPresetProxy.setWeaponPreset(i, weaponPresetProxy);
            }}
            onRemove={() => {
              teamPresetProxy.removeWeaponPreset(i);
            }}
            onSetAsMain={() => {
              teamPresetProxy.setWeaponPresetToMain(i);
            }}
          />
        ))}
      </CardList>
    </Stack>
  );
}
