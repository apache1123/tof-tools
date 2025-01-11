import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { Button } from "../../components/common/Button/Button";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { GearSetPresetSummaryCard } from "../../components/gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { TeamPresetCard } from "../../components/team/TeamPresetCard/TeamPresetCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterPreset } from "../../models/character/character-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "./useItemsBelongingToCharacter";

export interface CharacterPresetEditorProps {
  characterPresetProxy: CharacterPreset;
}

export function CharacterPresetEditor({
  characterPresetProxy,
}: CharacterPresetEditorProps) {
  const { characterId, name, teamPreset, gearSetPreset } = useSnapshot(
    characterPresetProxy,
  ) as CharacterPreset;

  const { items: teamPresets } = useItemsBelongingToCharacter(
    db.get("teamPresets"),
    characterId,
  );
  const [isSelectingTeamPreset, setIsSelectingTeamPreset] = useState(false);

  const { items: gearSetPresets } = useItemsBelongingToCharacter(
    db.get("gearSetPresets"),
    characterId,
  );
  const [isSelectingGearSetPreset, setIsSelectingGearSetPreset] =
    useState(false);

  return (
    <>
      <Stack sx={{ gap: 4 }}>
        <TextField
          label="Wanderer preset name"
          value={name}
          onChange={(e) => {
            characterPresetProxy.name = e.target.value;
          }}
        />

        <Stack sx={{ gap: 1 }}>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Typography variant="h5">Team preset</Typography>
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

          {teamPreset ? (
            <TeamPresetCard teamPreset={teamPreset} />
          ) : (
            <Typography sx={{ fontStyle: "italic" }}>
              No team preset selected
            </Typography>
          )}
        </Stack>

        <Stack sx={{ gap: 1 }}>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Typography variant="h5">Gear preset</Typography>
            <Button
              onClick={() => {
                setIsSelectingGearSetPreset(true);
              }}
            >
              Select
            </Button>
            <Button
              buttonProps={{ color: "error" }}
              onClick={() => {
                characterPresetProxy.gearSetPreset = undefined;
              }}
            >
              Remove
            </Button>
          </Stack>

          {gearSetPreset ? (
            <GearSetPresetSummaryCard preset={gearSetPreset} />
          ) : (
            <Typography sx={{ fontStyle: "italic" }}>
              No gear preset selected
            </Typography>
          )}
        </Stack>
      </Stack>

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

      {isSelectingGearSetPreset && (
        <StyledModal
          modalContent={
            <InventoryLayout
              filter={undefined}
              actions={undefined}
              items={gearSetPresets.map((gearSetPreset) => (
                <GearSetPresetSummaryCard
                  key={gearSetPreset.id}
                  preset={gearSetPreset}
                  onClick={() => {
                    const gearSetPresetProxy = db
                      .get("gearSetPresets")
                      .find(gearSetPreset.id);

                    if (gearSetPresetProxy) {
                      characterPresetProxy.gearSetPreset = gearSetPresetProxy;
                    }

                    setIsSelectingGearSetPreset(false);
                  }}
                />
              ))}
            />
          }
          open={isSelectingGearSetPreset}
          onClose={() => {
            setIsSelectingGearSetPreset(false);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
