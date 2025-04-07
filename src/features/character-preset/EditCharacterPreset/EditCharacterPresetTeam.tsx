import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio/index";

import { Button } from "../../../components/common/Button/Button";
import { StyledModal } from "../../../components/common/Modal/StyledModal";
import { ErrorText } from "../../../components/common/Text/ErrorText";
import { TeamPresetCard } from "../../../components/team/TeamPresetCard/TeamPresetCard";
import { WeaponIcon } from "../../../components/weapon/WeaponIcon/WeaponIcon";
import { db } from "../../../db/reactive-local-storage-db";
import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import type { TeamPresetId } from "../../../models/team/team-preset";
import { InventoryLayout } from "../../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../../common/useItemsBelongingToCharacter";
import { AddTeamPreset } from "../../team/AddTeamPreset";
import { ViewAndEditTeamPreset } from "../../team/ViewAndEditTeamPreset";
import { EditCharacterPresetSection } from "./EditCharacterPresetSection";

export interface EditCharacterPresetTeamProps {
  characterPresetProxy: CharacterPreset;
  expand?: boolean;
}

export function EditCharacterPresetTeam({
  characterPresetProxy,
  expand,
}: EditCharacterPresetTeamProps) {
  const { characterId, teamPreset } = useSnapshot(
    characterPresetProxy,
  ) as CharacterPreset;

  const { items: teamPresets } = useItemsBelongingToCharacter(
    db.get("teamPresets"),
    characterId,
  );

  const [isSelectingTeamPreset, setIsSelectingTeamPreset] = useState(false);
  const selectTeamPreset = (id: TeamPresetId) => {
    const teamPresetProxy = db.get("teamPresets").find(id);
    if (teamPresetProxy) {
      characterPresetProxy.teamPreset = teamPresetProxy;
    }

    setIsSelectingTeamPreset(false);
  };

  // Force open editor of the current selected team preset e.g. right after adding a new team preset
  const [forceEdit, setForceEdit] = useState(false);

  return (
    <>
      <EditCharacterPresetSection
        title="Team"
        summary={
          teamPreset ? (
            teamPreset.hasWeaponPresets ? (
              <Stack direction="row" sx={{ gap: 0.5 }}>
                {teamPreset
                  .getWeaponPresets()
                  .map(
                    (weaponPreset, i) =>
                      weaponPreset?.definition && (
                        <WeaponIcon
                          key={`${i}-${weaponPreset.definition.id}`}
                          weaponId={weaponPreset.definition.id}
                          iconWeaponId={weaponPreset.definition.iconWeaponId}
                          size={50}
                        />
                      ),
                  )}
              </Stack>
            ) : (
              <ErrorText sx={{ py: 0 }}>Team has no weapons</ErrorText>
            )
          ) : (
            <ErrorText sx={{ py: 0 }}>No team selected</ErrorText>
          )
        }
        details={
          <Stack sx={{ gap: 1 }}>
            <Stack direction="row" sx={{ gap: 1, alignItems: "end" }}>
              <Button
                onClick={() => {
                  setIsSelectingTeamPreset(true);
                }}
              >
                {teamPreset ? "Swap team" : "Select team"}
              </Button>
              {teamPreset && (
                <Button
                  buttonProps={{ color: "error" }}
                  onClick={() => {
                    characterPresetProxy.teamPreset = undefined;
                  }}
                >
                  Remove team
                </Button>
              )}

              {teamPreset && (
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Click on the team below to edit
                </Typography>
              )}
            </Stack>

            {teamPreset && characterPresetProxy.teamPreset && (
              <ViewAndEditTeamPreset
                teamPresetProxy={characterPresetProxy.teamPreset}
                forceEdit={forceEdit}
                onFinishEdit={() => {
                  if (forceEdit) {
                    setForceEdit(false);
                  }
                }}
                elevation={2}
              />
            )}
          </Stack>
        }
        expand={expand}
      />

      {isSelectingTeamPreset && (
        <StyledModal
          modalContent={
            <InventoryLayout
              filter={undefined}
              actions={
                <AddTeamPreset
                  characterId={characterId}
                  onAdded={(id) => {
                    selectTeamPreset(id);
                    setForceEdit(true);
                  }}
                />
              }
              items={teamPresets.map((teamPreset) => (
                <TeamPresetCard
                  key={teamPreset.id}
                  teamPreset={teamPreset}
                  onClick={() => {
                    selectTeamPreset(teamPreset.id);
                  }}
                />
              ))}
            />
          }
          modalTitle="Select team"
          open={isSelectingTeamPreset}
          onClose={() => {
            setIsSelectingTeamPreset(false);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
