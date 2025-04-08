import { Button } from "@mui/material";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { GearSetPresetId } from "../../models/gear/gear-set-preset";
import { GearSetPreset } from "../../models/gear/gear-set-preset";

export interface AddGearSetPresetProps {
  characterId: CharacterId;
  onAdded?(id: GearSetPresetId): void;
}

export function AddGearSetPreset({
  characterId,
  onAdded,
}: AddGearSetPresetProps) {
  const gearSetPresetRepo = db.get("gearSetPresets");

  return (
    <Button
      variant="contained"
      onClick={() => {
        const newPreset = new GearSetPreset(characterId);
        newPreset.name = "New gear preset";
        gearSetPresetRepo.add(newPreset);

        onAdded?.(newPreset.id);
      }}
    >
      Add gear preset
    </Button>
  );
}
