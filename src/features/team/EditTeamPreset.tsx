import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { EditorModal } from "../../components/common/Modal/EditorModal";
import { InfoText } from "../../components/common/Text/InfoText";
import { db } from "../../db/reactive-local-storage-db";
import { TeamPreset } from "../../models/team/team-preset";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";
import { EditWeaponPreset } from "../weapon/EditWeaponPreset";
import { EditTeamPresetWeapon } from "./EditTeamPresetWeapon";

export interface EditTeamPresetProps {
  teamPresetProxy: TeamPreset;
  onFinish(): void;
}

export function EditTeamPreset({
  teamPresetProxy,
  onFinish,
}: EditTeamPresetProps) {
  const teamPreset = useSnapshot(teamPresetProxy) as TeamPreset;
  const { name, characterId } = teamPreset;

  const [editingWeaponPresetProxy, setEditingWeaponPresetProxy] = useState<
    WeaponPreset | undefined
  >(undefined);

  return (
    <>
      <EditorModal
        modalContent={
          <Stack sx={{ gap: 2 }}>
            <TextField
              label="Team name"
              value={name}
              onChange={(e) => {
                teamPresetProxy.name = e.target.value;
              }}
            />

            <InfoText>
              The first weapon in the team must be set. It will be used as the
              main on-field weapon when comparing gear and should the weapon
              that deals the majority of the team&apos;s damage.
            </InfoText>

            <CardList direction="row" gap={1}>
              {[...Array(TeamPreset.maxNumOfWeapons)].map((_, i) => (
                <EditTeamPresetWeapon
                  key={i}
                  weaponPreset={teamPreset.getWeaponPreset(i)}
                  characterId={characterId}
                  disabled={i !== 0 && !teamPreset.getWeaponPreset(0)}
                  showSetAsMainButton={i !== 0}
                  onEdit={() => {
                    const weaponPresetProxy =
                      teamPresetProxy.getWeaponPreset(i);
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
        }
        modalTitle="Edit team"
        open={!!teamPreset}
        onClose={onFinish}
        itemName={!!teamPreset.name ? teamPreset.name : "this team"}
        showDelete
        onDelete={() => {
          db.get("teamPresets").remove(teamPresetProxy.id);
          onFinish();
        }}
        maxWidth={false}
      />

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
