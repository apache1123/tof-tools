import { Box, Stack } from "@mui/material";
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
}

export function EditCharacterPresetGearPreset({
  characterPresetProxy,
  expand,
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
            <Stack direction="row" sx={{ gap: 1 }}>
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
