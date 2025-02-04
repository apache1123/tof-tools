import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { Button } from "../../components/common/Button/Button";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { GearSetPresetSummaryCard } from "../../components/gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { TeamPresetCard } from "../../components/team/TeamPresetCard/TeamPresetCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterPreset } from "../../models/character/character-preset";
import type { GearSetPreset } from "../../models/gear/gear-set-preset";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";
import { InventoryLayout } from "../common/InventoryLayout";
import { EditGearSetPreset } from "../gear-set-preset/EditGearSetPreset";
import { ViewAndEditTeamPreset } from "../team/ViewAndEditTeamPreset";
import { EditCharacterPresetStats } from "./EditCharacterPresetStats";

export interface EditCharacterPresetProps {
  characterPresetProxy: CharacterPreset;
}

export function EditCharacterPreset({
  characterPresetProxy,
}: EditCharacterPresetProps) {
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
  const [editingGearSetPresetProxy, setEditingGearSetPresetProxy] = useState<
    GearSetPreset | undefined
  >(undefined);

  return (
    <>
      <TextField
        label="Preset name"
        value={name}
        onChange={(e) => {
          characterPresetProxy.name = e.target.value;
        }}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" sx={{ gap: 1, alignItems: "baseline" }}>
            <Typography variant="h6">Team</Typography>

            {!teamPreset && (
              <Typography
                sx={{
                  fontStyle: "italic",
                  color: (theme) => theme.palette.error.main,
                }}
              >
                No team preset selected
              </Typography>
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

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" sx={{ gap: 1, alignItems: "baseline" }}>
            <Typography variant="h6">Gear preset</Typography>

            {!gearSetPreset && (
              <Typography
                sx={{
                  fontStyle: "italic",
                  color: (theme) => theme.palette.error.main,
                }}
              >
                No gear preset selected
              </Typography>
            )}
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <Stack sx={{ gap: 1 }}>
            <Stack direction="row" sx={{ gap: 1 }}>
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

            {gearSetPreset && (
              <GearSetPresetSummaryCard
                preset={gearSetPreset}
                onClick={() => {
                  setEditingGearSetPresetProxy(
                    characterPresetProxy.gearSetPreset,
                  );
                }}
              />
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" sx={{ gap: 1, alignItems: "baseline" }}>
            <Typography variant="h6">Preset stats</Typography>

            {!teamPreset && (
              <Typography
                sx={{
                  fontStyle: "italic",
                  color: (theme) => theme.palette.error.main,
                }}
              >
                No team preset selected
              </Typography>
            )}
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <EditCharacterPresetStats
            characterPresetProxy={characterPresetProxy}
          />
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

      {editingGearSetPresetProxy && (
        <EditGearSetPreset
          presetProxy={editingGearSetPresetProxy}
          onFinish={() => {
            setEditingGearSetPresetProxy(undefined);
          }}
        />
      )}
    </>
  );
}
