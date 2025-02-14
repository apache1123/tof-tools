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
import { GearSetPresetSummaryCard } from "../../../components/gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { GearTypeIcon } from "../../../components/gear/GearTypeIcon/GearTypeIcon";
import { db } from "../../../db/reactive-local-storage-db";
import type { CharacterPreset } from "../../../models/character/character-preset";
import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import { InventoryLayout } from "../../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../../common/useItemsBelongingToCharacter";
import { EditGearSetPreset } from "../../gear-set-preset/EditGearSetPreset";

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
      <Accordion defaultExpanded={expand}>
        <AccordionSummary>
          <Stack
            direction="row"
            sx={{ gap: 2, alignItems: "center", flexWrap: "wrap" }}
          >
            <Typography variant="h6">Gear preset</Typography>

            {gearSetPreset ? (
              gearSetPreset.gearSet.hasGear ? (
                <Stack direction="row" sx={{ gap: 0.25, flexWrap: "wrap" }}>
                  {gearSetPreset.gearSet
                    .getSlots()
                    .map(
                      (slot) =>
                        slot.gear && (
                          <GearTypeIcon
                            key={slot.gear.type.id}
                            id={slot.gear.type.id}
                            rarity={slot.gear.rarity}
                            size={30}
                          />
                        ),
                    )}
                </Stack>
              ) : (
                <ErrorText sx={{ py: 0 }}>
                  Gear preset contains no gear
                </ErrorText>
              )
            ) : (
              <ErrorText sx={{ py: 0 }}>No gear preset selected</ErrorText>
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
