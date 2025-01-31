import { Alert, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { TeamPreset } from "../../models/team/team-preset";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";
import { EditWeaponPreset } from "../weapon/EditWeaponPreset";
import { EditTeamPresetWeapon } from "./EditTeamPresetWeapon";

export interface EditTeamPresetProps {
  teamPresetProxy: TeamPreset;
}

export function EditTeamPreset({ teamPresetProxy }: EditTeamPresetProps) {
  const teamPreset = useSnapshot(teamPresetProxy) as TeamPreset;
  const { name, characterId } = teamPreset;

  const [editingWeaponPresetProxy, setEditingWeaponPresetProxy] = useState<
    WeaponPreset | undefined
  >(undefined);

  return (
    <>
      <Stack sx={{ gap: 2 }}>
        <TextField
          label="Team name"
          value={name}
          onChange={(e) => {
            teamPresetProxy.name = e.target.value;
          }}
        />

        <Alert severity="info">
          The first weapon in the team must be set. It will be used as the main
          on-field weapon when comparing gear and should the weapon that deals
          the majority of the team&apos;s damage.
        </Alert>

        <CardList direction="row" gap={1}>
          {[...Array(TeamPreset.maxNumOfWeapons)].map((_, i) => (
            <EditTeamPresetWeapon
              key={i}
              weaponPreset={teamPreset.getWeaponPreset(i)}
              characterId={characterId}
              disabled={i !== 0 && !teamPreset.getWeaponPreset(0)}
              showSetAsMainButton={i !== 0}
              onEdit={() => {
                const weaponPresetProxy = teamPresetProxy.getWeaponPreset(i);
                setEditingWeaponPresetProxy(weaponPresetProxy);
              }}
              onSwap={(weaponPresetProxy) => {
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

      {editingWeaponPresetProxy && (
        <EditWeaponPreset
          weaponPresetProxy={editingWeaponPresetProxy}
          characterId={characterId}
          onFinish={() => {
            setEditingWeaponPresetProxy(undefined);
          }}
        />
      )}
    </>
  );
}
