import { Button } from "@mui/material";
import { useState } from "react";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { GearSetPresetSummaryCard } from "../../components/gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { GearSetPresetId } from "../../models/gear/gear-set-preset";
import { GearSetPreset } from "../../models/gear/gear-set-preset";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";
import { InventoryLayout } from "../common/InventoryLayout";
import { GearSetPresetEditor } from "./GearSetPresetEditor";

export interface GearSetPresetsProps {
  characterId: CharacterId;
}

export function GearSetPresets({ characterId }: GearSetPresetsProps) {
  const gearSetPresetRepo = db.get("gearSetPresets");
  const { items } = useItemsBelongingToCharacter(
    gearSetPresetRepo,
    characterId,
  );

  const [editingPresetId, setEditingPresetId] = useState<
    GearSetPresetId | undefined
  >(undefined);
  const editingPresetProxy = editingPresetId
    ? gearSetPresetRepo.find(editingPresetId)
    : undefined;

  const gearRepo = db.get("gears");

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <Button
            variant="contained"
            onClick={() => {
              const newPreset = new GearSetPreset(characterId);
              newPreset.name = "Gear preset name";
              gearSetPresetRepo.add(newPreset);

              setEditingPresetId(newPreset.id);
            }}
          >
            Add gear preset
          </Button>
        }
        items={items.map((preset) => (
          <GearSetPresetSummaryCard
            key={preset.id}
            preset={preset}
            onClick={() => {
              setEditingPresetId(preset.id);
            }}
          />
        ))}
      />

      {editingPresetProxy && (
        <EditorModal
          modalContent={
            <GearSetPresetEditor
              presetProxy={editingPresetProxy}
              onAddGear={(gear) => {
                gearRepo.add(gear);
              }}
            />
          }
          open={!!editingPresetId}
          onClose={() => {
            setEditingPresetId(undefined);
          }}
          itemName={editingPresetProxy.name}
          showDelete
          onDelete={() => {
            gearSetPresetRepo.remove(editingPresetProxy.id);
            setEditingPresetId(undefined);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
