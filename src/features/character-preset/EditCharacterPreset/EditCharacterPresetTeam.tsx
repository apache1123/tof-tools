import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio/index";

import { Button } from "../../../components/common/Button/Button";
import { ErrorText } from "../../../components/common/ErrorText/ErrorText";
import { StyledModal } from "../../../components/common/Modal/StyledModal";
import { TeamPresetCard } from "../../../components/team/TeamPresetCard/TeamPresetCard";
import { WeaponIcon } from "../../../components/weapon/WeaponIcon/WeaponIcon";
import { db } from "../../../db/reactive-local-storage-db";
import type { CharacterPreset } from "../../../models/character/character-preset";
import { InventoryLayout } from "../../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../../common/useItemsBelongingToCharacter";
import { ViewAndEditTeamPreset } from "../../team/ViewAndEditTeamPreset";

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

  return (
    <>
      <Accordion defaultExpanded={expand}>
        <AccordionSummary>
          <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
            <Typography variant="h6">Team</Typography>

            {teamPreset ? (
              teamPreset.hasWeaponPresets ? (
                <Stack direction="row" sx={{ gap: 0.5 }}>
                  {teamPreset
                    .getWeaponPresets()
                    .map(
                      (weaponPreset, i) =>
                        weaponPreset?.definition && (
                          <WeaponIcon
                            key={`${i}-${weaponPreset.definition.id}`}
                            weaponName={weaponPreset.definition.id}
                            iconWeaponName={
                              weaponPreset.definition.iconWeaponName
                            }
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
            )}
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <Stack sx={{ gap: 1 }}>
            <Stack direction="row" sx={{ gap: 1 }}>
              <Button
                onClick={() => {
                  setIsSelectingTeamPreset(true);
                }}
              >
                Select
              </Button>
              <Button
                buttonProps={{ color: "error" }}
                onClick={() => {
                  characterPresetProxy.teamPreset = undefined;
                }}
              >
                Remove
              </Button>
            </Stack>

            {teamPreset && characterPresetProxy.teamPreset && (
              <ViewAndEditTeamPreset
                teamPresetProxy={characterPresetProxy.teamPreset}
              />
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {isSelectingTeamPreset && (
        <StyledModal
          modalContent={
            <InventoryLayout
              filter={undefined}
              actions={undefined}
              items={teamPresets.map((teamPreset) => (
                <TeamPresetCard
                  key={teamPreset.id}
                  teamPreset={teamPreset}
                  onClick={() => {
                    const teamPresetProxy = db
                      .get("teamPresets")
                      .find(teamPreset.id);

                    if (teamPresetProxy) {
                      characterPresetProxy.teamPreset = teamPresetProxy;
                    }

                    setIsSelectingTeamPreset(false);
                  }}
                />
              ))}
            />
          }
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
