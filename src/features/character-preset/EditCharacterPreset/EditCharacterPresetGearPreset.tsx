import { Alert, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio/index";

import { Button } from "../../../components/common/Button/Button";
import { ErrorText } from "../../../components/common/ErrorText/ErrorText";
import { StyledModal } from "../../../components/common/Modal/StyledModal";
import { GearSetPresetSummaryCard } from "../../../components/gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { GearTypeIcon } from "../../../components/gear/GearTypeIcon/GearTypeIcon";
import { db } from "../../../db/reactive-local-storage-db";
import type { CharacterPreset } from "../../../models/character/character-preset";
import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import { InventoryLayout } from "../../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../../common/useItemsBelongingToCharacter";
import { AddGearSetPreset } from "../../gear-set-preset/AddGearSetPreset";
import { EditGearSetPreset } from "../../gear-set-preset/EditGearSetPreset";
import { EditCharacterPresetSection } from "./EditCharacterPresetSection";

export interface EditCharacterPresetGearPresetProps {
  characterPresetProxy: CharacterPreset;
  expand?: boolean;
  showInfoForGearCompare?: boolean;
}

export function EditCharacterPresetGearPreset({
  characterPresetProxy,
  expand,
  showInfoForGearCompare,
}: EditCharacterPresetGearPresetProps) {
  const { characterId, gearSetPreset } = useSnapshot(
    characterPresetProxy,
  ) as CharacterPreset;

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
      <EditCharacterPresetSection
        title="Gear preset"
        summary={
          gearSetPreset ? (
            gearSetPreset.gearSet.hasGear ? (
              <Stack direction="row" sx={{ gap: 0.25, flexWrap: "wrap" }}>
                {gearSetPreset.gearSet.getSlots().map((slot) =>
                  slot.gear ? (
                    <GearTypeIcon
                      key={slot.gear.type.id}
                      id={slot.gear.type.id}
                      rarity={slot.gear.rarity}
                      size={30}
                    />
                  ) : (
                    <Box
                      key={slot.acceptsType.id}
                      sx={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <GearTypeIcon
                        id={slot.acceptsType.id}
                        monochromeWhite
                        size={20}
                      />
                    </Box>
                  ),
                )}
              </Stack>
            ) : (
              <ErrorText sx={{ py: 0 }}>Gear preset contains no gear</ErrorText>
            )
          ) : (
            <ErrorText sx={{ py: 0 }}>No gear preset selected</ErrorText>
          )
        }
        details={
          <Stack sx={{ gap: 1 }}>
            {showInfoForGearCompare && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Add your current piece of gear you want to compare. You do not
                need to add every single gear to do a compare, but it is
                recommended you do. The result will be more accurate, especially
                if the gear you are comparing has ATK% and another gear in the
                preset also has it.
              </Alert>
            )}

            <Stack direction="row" sx={{ gap: 1, alignItems: "end" }}>
              <Button
                onClick={() => {
                  setIsSelectingGearSetPreset(true);
                }}
              >
                {gearSetPreset ? "Swap gear preset" : "Select gear preset"}
              </Button>

              {gearSetPreset && (
                <Button
                  buttonProps={{ color: "error" }}
                  onClick={() => {
                    characterPresetProxy.gearSetPreset = undefined;
                  }}
                >
                  Remove gear preset
                </Button>
              )}

              {gearSetPreset && (
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Click on the gear preset below to edit
                </Typography>
              )}
            </Stack>

            {gearSetPreset && (
              <GearSetPresetSummaryCard
                preset={gearSetPreset}
                onClick={() => {
                  setEditingGearSetPresetProxy(
                    characterPresetProxy.gearSetPreset,
                  );
                }}
                elevation={2}
              />
            )}
          </Stack>
        }
        expand={expand}
      />

      {isSelectingGearSetPreset && (
        <StyledModal
          modalContent={
            <InventoryLayout
              filter={undefined}
              actions={<AddGearSetPreset characterId={characterId} />}
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
          modalTitle="Select gear preset"
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
