import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { GearSetPresetEditorModal } from "../../components/mutational/gear/GearSetPresetEditorModal/GearSetPresetEditorModal";
import { GearSetPresetSummaryCardList } from "../../components/presentational/gear/GearSetPresetSummaryCardList/GearSetPresetSummaryCardList";
import { db } from "../../db/reactive-local-storage-db";
import type { Repository } from "../../db/repository/types/repository";
import type { GearSetPresetId } from "../../models/gear/gear-set-preset";
import { GearSetPreset } from "../../models/gear/gear-set-preset";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { InventoryLayout } from "../common/InventoryLayout";

export function GearSetPresets() {
  const { selectedCharacterId } = useSelectedCharacter();

  const gearSetPresetRepoProxy = db.get("gearSetPresets");
  const gearSetPresetRepo = useSnapshot(
    gearSetPresetRepoProxy,
  ) as Repository<GearSetPreset>;

  const presets = gearSetPresetRepo.filter((preset) => {
    return preset.characterId === selectedCharacterId;
  });

  const [editingPresetId, setEditingPresetId] = useState<
    GearSetPresetId | undefined
  >(undefined);
  const editingPresetProxy = editingPresetId
    ? gearSetPresetRepoProxy.find(editingPresetId)
    : undefined;

  const gearRepoProxy = db.get("gears");
  const allGearsProxy = gearRepoProxy.filter((gear) => {
    return gear.characterId === selectedCharacterId;
  });

  return (
    selectedCharacterId && (
      <>
        <InventoryLayout
          filter={undefined}
          actions={
            <Button
              variant="contained"
              onClick={() => {
                const newPreset = new GearSetPreset(selectedCharacterId);
                newPreset.name = "Gear Preset";
                gearSetPresetRepoProxy.add(newPreset);

                setEditingPresetId(newPreset.id);
              }}
            >
              Add gear preset
            </Button>
          }
          items={
            <GearSetPresetSummaryCardList
              presets={presets}
              onClick={(id) => {
                setEditingPresetId(id);
              }}
            />
          }
        />

        {editingPresetProxy && (
          <GearSetPresetEditorModal
            open={!!editingPresetId}
            onClose={() => {
              setEditingPresetId(undefined);
            }}
            presetProxy={editingPresetProxy}
            itemName={editingPresetProxy.name}
            allGearsProxy={allGearsProxy}
            characterId={selectedCharacterId}
            onAddGear={(gear) => {
              gearRepoProxy.add(gear);
            }}
            showDelete
            onDelete={() => {
              gearSetPresetRepoProxy.remove(editingPresetProxy.id);
              setEditingPresetId(undefined);
            }}
          />
        )}
      </>
    )
  );
}
