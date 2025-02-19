import { useState } from "react";

import { GearSetPresetSummaryCard } from "../../components/gear/GearSetPresetSummaryCard/GearSetPresetSummaryCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { GearSetPresetId } from "../../models/gear/gear-set-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { AddGearSetPreset } from "./AddGearSetPreset";
import { EditGearSetPreset } from "./EditGearSetPreset";

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

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <AddGearSetPreset
            characterId={characterId}
            onAdded={(id) => {
              setEditingPresetId(id);
            }}
          />
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
        <EditGearSetPreset
          presetProxy={editingPresetProxy}
          onFinish={() => {
            setEditingPresetId(undefined);
          }}
        />
      )}
    </>
  );
}
