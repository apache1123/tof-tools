import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import type {
  CharacterPreset,
  CharacterPresetId,
} from "../../../models/character/character-preset";

export interface CharacterPresetSelectorProps {
  presets: CharacterPreset[];
  selectedPresetId: CharacterPresetId | undefined;
  onSelect(presetId: CharacterPresetId): void;
}

const label = "Choose preset";

export function CharacterPresetSelector({
  presets,
  selectedPresetId,
  onSelect,
}: CharacterPresetSelectorProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="preset-select-label">{label}</InputLabel>
      <Select
        labelId="preset-select-label"
        id="preset-select"
        value={selectedPresetId ?? ""}
        label={label}
        onChange={(event) => {
          onSelect(event.target.value);
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
