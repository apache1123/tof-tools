import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import type { CoreElementalType } from '../../models/stat-type';
import { ElementalType } from '../../models/stat-type';

export interface CoreElementalTypeSelectorProps {
  elementalType: CoreElementalType | undefined;
  onElementalTypeChange?(value: CoreElementalType): void;
  label?: string;
  size?: 'small' | 'medium';
}

const options: CoreElementalType[] = [
  ElementalType.Flame,
  ElementalType.Frost,
  ElementalType.Physical,
  ElementalType.Volt,
];

export function CoreElementalTypeSelector({
  elementalType,
  onElementalTypeChange,
  label = 'Elemental type',
  size = 'medium',
}: CoreElementalTypeSelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    if (onElementalTypeChange)
      onElementalTypeChange(event.target.value as CoreElementalType);
  };

  return (
    <FormControl
      variant="filled"
      fullWidth
      required
      error={!elementalType}
      size={size}
    >
      <InputLabel id="elemental-type-select-label">{label}</InputLabel>
      <Select
        labelId="elemental-type-select-label"
        id="elemental-type-select"
        value={elementalType ?? ''}
        label="Elemental type"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
