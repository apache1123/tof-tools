import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import type { CharacterPreset } from "../../../models/character/character-preset";

export interface CharacterPresetSelectorProps {
  presets: CharacterPreset[];
  selectedPreset: CharacterPreset | undefined;
  onSelect(preset: CharacterPreset): void;
}

const label = "Choose preset";

export function CharacterPresetSelector({
  presets,
  selectedPreset,
  onSelect,
}: CharacterPresetSelectorProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="preset-select-label">{label}</InputLabel>
      <Select
        labelId="preset-select-label"
        id="preset-select"
        value={selectedPreset?.id ?? ""}
        label={label}
        onChange={(event) => {
          const preset = presets.find(
            (preset) => preset.id === event.target.value,
          );

          if (preset) {
            onSelect(preset);
          }
        }}
      >
        {presets.map((preset) => (
          <MenuItem key={preset.id} value={preset.id}>
            {preset.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
