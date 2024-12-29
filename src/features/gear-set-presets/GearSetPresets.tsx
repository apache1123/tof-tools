import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { GearSetPresetSummaryCard } from "../../components/gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { db } from "../../db/reactive-local-storage-db";
import type { Repository } from "../../db/repository/types/repository";
import type { CharacterId } from "../../models/character/character";
import type { GearSetPresetId } from "../../models/gear/gear-set-preset";
import { GearSetPreset } from "../../models/gear/gear-set-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { GearSetPresetEditor } from "../gears/GearSetPresetEditor";

export interface GearSetPresetsProps {
  characterId: CharacterId;
}

export function GearSetPresets({ characterId }: GearSetPresetsProps) {
  const gearSetPresetRepoProxy = db.get("gearSetPresets");
  const gearSetPresetRepo = useSnapshot(
    gearSetPresetRepoProxy,
  ) as Repository<GearSetPreset>;

  const presets = gearSetPresetRepo.filter((preset) => {
    return preset.characterId === characterId;
  });

  const [editingPresetId, setEditingPresetId] = useState<
    GearSetPresetId | undefined
  >(undefined);
  const editingPresetProxy = editingPresetId
    ? gearSetPresetRepoProxy.find(editingPresetId)
    : undefined;

  const gearRepoProxy = db.get("gears");
  const allGearsProxy = gearRepoProxy.filter((gear) => {
    return gear.characterId === characterId;
  });

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <Button
            variant="contained"
            onClick={() => {
              const newPreset = new GearSetPreset(characterId);
              newPreset.name = "Gear Preset";
              gearSetPresetRepoProxy.add(newPreset);

              setEditingPresetId(newPreset.id);
            }}
          >
            Add gear preset
          </Button>
        }
        items={presets.map((preset) => (
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
              allGearsProxy={allGearsProxy}
              characterId={characterId}
              onAddGear={(gear) => {
                gearRepoProxy.add(gear);
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
            gearSetPresetRepoProxy.remove(editingPresetProxy.id);
            setEditingPresetId(undefined);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
