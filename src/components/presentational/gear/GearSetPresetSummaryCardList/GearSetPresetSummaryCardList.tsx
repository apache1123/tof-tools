import { Stack } from "@mui/material";

import type {
  GearSetPreset,
  GearSetPresetId,
} from "../../../../models/gear/gear-set-preset";
import { GearSetPresetSummaryCard } from "../GearSetPresetSummaryCard/GearSetPresetSummaryCard";

export interface GearSetPresetSummaryCardList {
  presets: GearSetPreset[];
  onClick?(id: GearSetPresetId): void;
}

export function GearSetPresetSummaryCardList({
  presets,
  onClick,
}: GearSetPresetSummaryCardList) {
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
      {presets.map((preset) => (
        <GearSetPresetSummaryCard
          key={preset.id}
          preset={preset}
          onClick={() => {
            if (onClick) onClick(preset.id);
          }}
        />
      ))}
    </Stack>
  );
}
